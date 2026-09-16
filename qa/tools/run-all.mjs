import { spawnSync } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { qaRoot, validatePackage } from './validate.mjs';
import { runContracts } from './run-contracts.mjs';

const reportDir=path.join(qaRoot,'reports');
await mkdir(reportDir,{recursive:true});
const packageReport=await validatePackage();
await writeFile(path.join(reportDir,'package-validation.json'),JSON.stringify(packageReport,null,2)+'\n');
if(packageReport.status!=='PASS') {
 console.error(JSON.stringify(packageReport,null,2));process.exitCode=3;
} else {
 const harness=spawnSync(process.execPath,['--test','--test-reporter=tap',path.join(qaRoot,'tests','harness.test.mjs')],{
   encoding:'utf8',timeout:60000,maxBuffer:5_000_000,
   env:{PATH:process.env.PATH??'',TZ:'UTC',NODE_NO_WARNINGS:'1'}
 });
 const output=(harness.stdout??'')+(harness.stderr??'');
 await writeFile(path.join(reportDir,'harness.tap'),output);
 const harnessSummary={scope:'Harness and fixture-integrity checks only; not DealerSource application tests',
   runtime:process.version,exitCode:harness.status,error:harness.error?.message??null,
   tests:Number(output.match(/^# tests (\d+)$/m)?.[1]??0),
   passed:Number(output.match(/^# pass (\d+)$/m)?.[1]??0),
   failed:Number(output.match(/^# fail (\d+)$/m)?.[1]??0),
   skipped:Number(output.match(/^# skipped (\d+)$/m)?.[1]??0)};
 await writeFile(path.join(reportDir,'harness-summary.json'),JSON.stringify(harnessSummary,null,2)+'\n');
 console.log(JSON.stringify({package:packageReport,harness:harnessSummary},null,2));
 if(harness.status!==0 || harness.error || harnessSummary.tests===0) process.exitCode=3;
 else process.exitCode=(await runContracts({adapter:path.join(qaRoot,'adapters','application.mjs'),out:reportDir})).exitCode;
}
