import { readFile, readdir, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

export const qaRoot = fileURLToPath(new URL('../', import.meta.url));
export async function loadData(root = qaRoot) {
  const read = async p => JSON.parse(await readFile(path.join(root, p), 'utf8'));
  return { catalog: await read('catalog/acceptance.json'), fixtures: await read('fixtures/cases.json') };
}
export function validateData(catalog, fixtures) {
  const errors = [], ids = new Set(), caseIds = new Set(), requirements = new Set();
  if (catalog.schemaVersion !== 1 || fixtures.schemaVersion !== 1) errors.push('Unsupported schema version.');
  if (!Array.isArray(catalog.criteria) || !catalog.criteria.length) return ['Acceptance catalog must not be empty.'];
  if (!Array.isArray(fixtures.cases) || !fixtures.cases.length) return ['Fixtures must not be empty.'];
  for (const ac of catalog.criteria) {
    if (!/^AC-[A-Z]+-\d{2}$/.test(ac.id)) errors.push(`Invalid AC id: ${ac.id}`);
    if (ids.has(ac.id)) errors.push(`Duplicate AC: ${ac.id}`); ids.add(ac.id);
    for (const key of ['title','domain','given','when','then']) if (typeof ac[key] !== 'string' || !ac[key].trim()) errors.push(`${ac.id} missing ${key}`);
    if (!['contract','controlled-integration','manual'].includes(ac.level)) errors.push(`${ac.id} invalid level`);
    if (!['P0','P1','P2'].includes(ac.priority)) errors.push(`${ac.id} invalid priority`);
    if (!Array.isArray(ac.fixtureIds)) errors.push(`${ac.id} fixtureIds missing`);
    if (!Array.isArray(ac.requirementIds) || !ac.requirementIds.length) errors.push(`${ac.id} lacks requirements`);
    for (const req of ac.requirementIds ?? []) { if (!/^R(0[1-9]|1[0-3])$/.test(req)) errors.push(`${ac.id} invalid requirement ${req}`); requirements.add(req); }
    if (!Array.isArray(ac.specificationSections) || ac.specificationSections.some(s => !/^0[1-9]$|^1[0-9]$/.test(s))) errors.push(`${ac.id} invalid specification section`);
    if (!/^T(0[1-9]|1[0-3])$/.test(ac.specificationTestGroup)) errors.push(`${ac.id} invalid test group`);
    if (!Number.isInteger(ac.earliestPhase) || ac.earliestPhase < 0 || ac.earliestPhase > 6) errors.push(`${ac.id} invalid phase`);
    if (ac.status !== 'NOT_RUN') errors.push(`${ac.id} catalog must not contain an invented execution pass`);
    if (!Array.isArray(ac.steps) || ac.steps.length < 3 || !Array.isArray(ac.evidenceRequired) || !ac.evidenceRequired.length) errors.push(`${ac.id} lacks procedure/evidence`);
  }
  const byAc = new Map(catalog.criteria.map(ac => [ac.id, ac]));
  for (const tc of fixtures.cases) {
    if (!/^TC-[A-Z]+-\d{2}-.+$/.test(tc.id)) errors.push(`Invalid test id: ${tc.id}`);
    if (caseIds.has(tc.id)) errors.push(`Duplicate test: ${tc.id}`); caseIds.add(tc.id);
    if (!byAc.has(tc.acId)) errors.push(`${tc.id} references missing AC`);
    else if (!byAc.get(tc.acId).fixtureIds?.includes(tc.id)) errors.push(`${tc.id} lacks reverse traceability`);
    if (!tc.operation || !/^[a-zA-Z][a-zA-Z0-9]+$/.test(tc.operation)) errors.push(`${tc.id} invalid operation`);
    if (!tc.input || typeof tc.input !== 'object' || Array.isArray(tc.input)) errors.push(`${tc.id} input must be an object`);
    if (!tc.expected || typeof tc.expected !== 'object') errors.push(`${tc.id} expected output missing`);
    if (tc.provenance !== 'synthetic-development' || tc.implementationStatus !== 'NOT_IMPLEMENTED') errors.push(`${tc.id} unsupported provenance or status`);
    if (!Number.isInteger(tc.timeoutMs) || tc.timeoutMs < 10 || tc.timeoutMs > 10000) errors.push(`${tc.id} invalid timeout`);
  }
  for (const ac of catalog.criteria) {
    if (ac.level === 'contract' && !ac.fixtureIds?.length) errors.push(`${ac.id} contract has no fixtures`);
    for (const id of ac.fixtureIds ?? []) if (!caseIds.has(id)) errors.push(`${ac.id} references missing fixture ${id}`);
  }
  for (let n = 1; n <= 13; n++) { const req = `R${String(n).padStart(2,'0')}`; if (!requirements.has(req)) errors.push(`${req} not covered`); }
  if (fixtures.visibility !== 'public-development-not-locked') errors.push('Development fixtures must not be mislabeled as locked.');
  if (/[\u2013\u2014]/.test(JSON.stringify({ catalog, fixtures }))) errors.push('Long dash characters found.');
  return errors;
}

export async function validatePackage(root = qaRoot) {
  const { catalog, fixtures } = await loadData(root);
  const errors = validateData(catalog, fixtures);
  const packageJson = JSON.parse(await readFile(path.join(root, 'package.json'), 'utf8'));
  if (Object.keys(packageJson.dependencies ?? {}).length || Object.keys(packageJson.devDependencies ?? {}).length) errors.push('Unexpected dependency added to zero-dependency harness.');
  const files = [];
  async function walk(dir) { for (const entry of await readdir(dir, { withFileTypes:true })) {
    const p = path.join(dir,entry.name);
    if (entry.isDirectory()) { if (!['reports','.scratch','node_modules'].includes(entry.name)) await walk(p); }
    else if (/\.(md|mjs|json|py|csv)$/.test(entry.name)) files.push(p);
  } }
  await walk(root);
  for (const file of files) if (/[\u2013\u2014]/.test(await readFile(file,'utf8'))) errors.push(`Long dash in ${path.relative(root,file)}`);
  const levels = {}; for (const ac of catalog.criteria) levels[ac.level]=(levels[ac.level]??0)+1;
  return { status: errors.length ? 'FAIL' : 'PASS', scope:'Test-package integrity only, not application behavior',
    criteria:catalog.criteria.length, fixtures:fixtures.cases.length, levels, checkedTextFiles:files.length,
    requirementIds:[...new Set(catalog.criteria.flatMap(ac=>ac.requirementIds))].sort(), errors };
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const report = await validatePackage();
  await mkdir(path.join(qaRoot,'reports'), { recursive:true });
  await writeFile(path.join(qaRoot,'reports','package-validation.json'),JSON.stringify(report,null,2)+'\n');
  console.log(JSON.stringify(report,null,2));
  process.exitCode = report.status === 'PASS' ? 0 : 1;
}
