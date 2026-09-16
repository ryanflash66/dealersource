import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadData, validateData, qaRoot } from './validate.mjs';
import { summarizeResults } from './runner-core.mjs';
import { runIsolated } from './process-runner.mjs';

export function parseArgs(args) {
  const opts = { adapter: path.join(qaRoot,'adapters','application.mjs'), out: path.join(qaRoot,'reports'), help:false };
  const seen = new Set();
  for (let i=0;i<args.length;i++) {
    const key=args[i];
    if (key==='--help' && args.length===1) return { ...opts, help:true };
    if (!['--adapter','--out'].includes(key) || seen.has(key) || !args[i+1] || args[i+1].startsWith('--')) throw new Error(`Invalid argument: ${key}`);
    seen.add(key); opts[key.slice(2)]=path.resolve(args[++i]);
  }
  return opts;
}
export async function runContracts(opts) {
  const {catalog,fixtures}=await loadData();
  const errors=validateData(catalog,fixtures);
  if (errors.length) throw new Error(`Invalid test data: ${errors.join('; ')}`);
  await mkdir(opts.out,{recursive:true});
  const startedAt=new Date().toISOString(), results=[];
  for (const tc of fixtures.cases) {
    results.push(await runIsolated(opts.adapter,tc));
    // Save completed work after every case, without exporting input mail/documents.
    await writeFile(path.join(opts.out,'contract-progress.json'),JSON.stringify({startedAt,completed:results.length,total:fixtures.cases.length,results},null,2)+'\n');
  }
  const summary=summarizeResults(results,catalog.criteria);
  const report={schemaVersion:1,startedAt,finishedAt:new Date().toISOString(),runtime:process.version,
    baselineCommit:catalog.baselineCommit,adapter:path.relative(qaRoot,opts.adapter),
    dataset:'public-development-not-locked',scope:'Synthetic contract checks against declared adapter bindings; not live integration or acceptance evidence',
    ...summary,results};
  await writeFile(path.join(opts.out,'application-contracts.json'),JSON.stringify(report,null,2)+'\n');
  const text=[
    'DealerSource application contract results',
    `Baseline: ${report.baselineCommit}`, `Runtime: ${report.runtime}`, `Dataset: ${report.dataset}`,
    `Cases: ${JSON.stringify(summary.counts)}`, `Acceptance criteria: ${JSON.stringify(summary.acceptanceCounts)}`,
    `Contract command exit code: ${summary.exitCode}`, 'Release decision: BLOCKED', summary.releaseReason,
    'A passing harness or package check is not a passing application.', '',
    ...results.map(r=>`${r.id} | ${r.acId} | ${r.status} | ${r.reason ?? 'Expected observable output matched.'}`),
    '', 'Integration/manual ACs require separate approved evidence and remain NOT_RUN.'
  ].join('\n')+'\n';
  await writeFile(path.join(opts.out,'application-contracts.txt'),text);
  console.log(JSON.stringify({counts:summary.counts,acceptanceCounts:summary.acceptanceCounts,exitCode:summary.exitCode,releaseDecision:'BLOCKED'},null,2));
  return report;
}
if (process.argv[1] && path.resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  try {
    const opts=parseArgs(process.argv.slice(2));
    if (opts.help) console.log('Usage: node qa/tools/run-contracts.mjs [--adapter PATH] [--out DIRECTORY]\nExit 0=selected contracts pass; 1=contract failure; 2=missing/test-double implementation; 3=harness/configuration error. No contract result authorizes release.');
    else process.exitCode=(await runContracts(opts)).exitCode;
  } catch(error) {
    const report={status:'HARNESS_ERROR',message:error.message,exitCode:3,releaseDecision:'BLOCKED'};
    await mkdir(path.join(qaRoot,'reports'),{recursive:true});
    await writeFile(path.join(qaRoot,'reports','contract-command-error.json'),JSON.stringify(report,null,2)+'\n');
    console.error(JSON.stringify(report));process.exitCode=3;
  }
}
