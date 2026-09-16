import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { loadData, qaRoot } from './validate.mjs';
const {catalog,fixtures}=await loadData();
const levels={};for(const ac of catalog.criteria)levels[ac.level]=(levels[ac.level]??0)+1;
const header=['# DealerSource acceptance criteria and test procedures','',
 'Status: test-first design. No DealerSource application exists at the pinned baseline.',
 `Baseline commit: ${catalog.baselineCommit}`,
 `Public development catalog: ${catalog.criteria.length} ACs, ${fixtures.cases.length} contract cases.`,
 `Test levels: ${JSON.stringify(levels)}.`,
 'These are not a blind/locked acceptance set. Harness checks are not application passes.',
 'P0 is critical safety/correctness; P1 is required functional/operating behavior. All in-scope requirements still need acceptance evidence.',''];
const body=[];let domain='';
for(const ac of catalog.criteria){
 if(ac.domain!==domain){domain=ac.domain;body.push(`## ${domain}`,'');}
 body.push(`### ${ac.id}: ${ac.title}`,'',
 `- Requirements: ${ac.requirementIds.join(', ')}`,
 `- Specification sections: ${ac.specificationSections.join(', ')}; group ${ac.specificationTestGroup}`,
 `- Priority: ${ac.priority}; earliest phase: ${ac.earliestPhase}; test level: ${ac.level}`,
 '- Current status: NOT_RUN; application binding is missing at baseline.',
 `- Given: ${ac.given}`,`- When: ${ac.when}`,`- Acceptance criterion: ${ac.then}`,'',
 ...ac.steps.map((s,i)=>`${i+1}. ${s}`),'',
 `Evidence: ${ac.evidenceRequired.join('; ')}.`,
 `Executable fixture IDs: ${ac.fixtureIds.length?ac.fixtureIds.join(', '):'None. Requires controlled integration or manual evidence; it is not silently skipped.'}`,'');
}
await writeFile(path.join(qaRoot,'ACCEPTANCE_CRITERIA.md'),[...header,...body].join('\n')+'\n');
const escape=v=>'"'+String(v).replaceAll('"','""')+'"';
const rows=[['AC ID','Title','Requirements','Specification sections','Test group','Priority','Earliest phase','Level','Fixture IDs','Given','When','Acceptance criterion','Status']];
for(const ac of catalog.criteria) rows.push([ac.id,ac.title,ac.requirementIds.join(';'),ac.specificationSections.join(';'),ac.specificationTestGroup,ac.priority,ac.earliestPhase,ac.level,ac.fixtureIds.join(';'),ac.given,ac.when,ac.then,'NOT_RUN']);
await writeFile(path.join(qaRoot,'catalog','traceability.csv'),rows.map(r=>r.map(escape).join(',')).join('\n')+'\n');
const ops=[...new Set(fixtures.cases.map(c=>c.operation))].sort();
const out=['# Proposed adapter contracts','',
 'These are test-first interface proposals, not discovered application APIs. Keep the acceptance meaning; a thin adapter may map real application functions to these names and output shapes.',
 'The default adapters/application.mjs explicitly declares missing implementation. Do not replace it with fixture-answer lookups or a fake production implementation.',
 'All expected objects are compared exactly, including nulls, numeric types, arrays, reasons and unexpected keys. Money is integer cents; decimal quote strings are unambiguous. Display cents use half-up rounding; rent-cap comparisons use the exact unrounded amount.',
 'Inputs are synthetic policy/evidence snapshots at the layer being tested. Flags such as approved, authority or schemaValid are NOT trusted client permissions in production. The integration/manual ACs must independently verify the real authentication, parsing, authority resolution, database and transport layers.',
 'A contract PASS only proves the supplied binding matched these public development cases. It does not prove correctness of a database, Google permissions, real source coverage or the entire business workflow.',
 'The application function receives only a clone of input, never fixture ID, AC ID or expected output. This separation is not a blind test or a defense against a dishonest adapter reading local fixture files. Review the binding and retain an independent locked set later.',
 '', '## Adapter form', '', '```javascript',
 "export const implementation = { kind: 'application', revision: 'ACTUAL_IMPLEMENTATION_COMMIT' };",
 '// Export reviewed thin bindings only. Never copy the acceptance answers.',
 'export const operations = { /* operationName: input => realApplicationFunction(input) */ };',
 '```','',
 'The adapter must be importable by Node 24 and produce JSON-compatible exact contract outputs. Build TypeScript first if its syntax or module imports require compilation. No package installation is required for this harness. Application dependencies, if introduced later, are separate.',
 'Each case executes in a fresh process. State is not shared across cases; persistent workflow, concurrency, browser, database and real provider tests are deliberately recorded as integration/manual ACs.',
 'An application binding must not print to stdout, read expected answers, or return hard-coded results keyed by fixture. Build and review the actual modules first. A declared test-double never earns application coverage. Adapter metadata is an author assertion, not automatic proof that code is real.',''];
for(const op of ops){const cases=fixtures.cases.filter(c=>c.operation===op);out.push(`## ${op}`,`ACs: ${[...new Set(cases.map(c=>c.acId))].join(', ')}. Cases: ${cases.length}.`,'','First input example:','```json',JSON.stringify(cases[0].input,null,2),'```','Expected observable output:','```json',JSON.stringify(cases[0].expected,null,2),'```','See fixtures/cases.json for every positive, negative and boundary case.','');}
await writeFile(path.join(qaRoot,'CONTRACTS.md'),out.join('\n')+'\n');
const manual=['# Controlled integration and manual execution ledger','',
 'All entries start NOT_RUN. Do not make real network, mailbox, browser, data-provider or paid-model calls without the phase-specific PM approval.',
 'Copy this ledger for a specific authorized implementation revision. Fill actual outcomes and evidence links; do not edit the baseline catalog to invent history.',''];
for(const ac of catalog.criteria.filter(c=>c.level!=='contract'))manual.push(`## ${ac.id}: ${ac.title}`,`Level: ${ac.level}. Phase: ${ac.earliestPhase}. Priority: ${ac.priority}.`,'',`Preconditions: ${ac.given}`,...ac.steps.map((s,i)=>`${i+1}. ${s}`),`Expected: ${ac.then}`,'','- Actual status: NOT_RUN','- Implementation/configuration revision: UNAVAILABLE','- PM authorization record and allowed scope: UNAVAILABLE','- Actual outcome and failure details: UNAVAILABLE','- Saved logs/record IDs/screenshots/measurement: UNAVAILABLE','- Reviewer and execution time: UNAVAILABLE','- Cost provenance and external effects: UNAVAILABLE','');
await writeFile(path.join(qaRoot,'INTEGRATION_MANUAL_LEDGER.md'),manual.join('\n')+'\n');
console.log(JSON.stringify({criteria:catalog.criteria.length,fixtures:fixtures.cases.length,operations:ops.length,levels},null,2));
