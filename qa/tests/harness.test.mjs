import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, rm, readFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { qaRoot, loadData, validateData, validatePackage } from '../tools/validate.mjs';
import { validateAdapter, compareResult, executeCase, summarizeResults } from '../tools/runner-core.mjs';
import { runIsolated } from '../tools/process-runner.mjs';
import { parseArgs } from '../tools/run-contracts.mjs';

const {catalog,fixtures}=await loadData();
const testcase={id:'TC-HARNESS-01-example',acId:'AC-HARNESS-01',operation:'sum',input:{a:2,b:3},expected:{sum:5},timeoutMs:100};
const criterion={id:'AC-HARNESS-01',level:'contract',priority:'P0',fixtureIds:[testcase.id]};
const app=operations=>({implementation:{kind:'application',revision:'synthetic-harness-fixture-not-dealersource'},operations});

// Independent rational arithmetic validates authored fixture expectations only.
function decimalFraction(value) {
  const [whole, fraction='']=String(value).split('.');
  return [BigInt(whole+fraction),10n**BigInt(fraction.length)];
}
for (const tc of fixtures.cases.filter(c=>c.operation==='normalizeRent' && c.expected.monthlyBaseCents!==null)) {
  test(`Fixture arithmetic, not application coverage: ${tc.id}`,()=>{
    const i=tc.input;let [n,d]=decimalFraction(i.amount);n*=100n;
    if(i.basis==='YEAR_TOTAL'||i.basis==='SQFT_YEAR')d*=12n;
    if(i.basis==='SQFT_YEAR'||i.basis==='SQFT_MONTH'){const [an,ad]=decimalFraction(i.leasedSqFt);n*=an;d*=ad;}
    const cents=Number((2n*n+d)/(2n*d));
    const above=n>BigInt(i.maxCents)*d;
    const below=i.minimumIsBinding && n<BigInt(i.preferredMinCents)*d;
    assert.equal(tc.expected.monthlyBaseCents,cents);
    assert.equal(tc.expected.status,above||below?'FAIL':'PASS');
    assert.equal(tc.expected.knownOccupancySubtotalCents,cents+i.additionalMonthlyCents);
    assert.equal(tc.expected.allInCents,i.allCostsKnown?cents+i.additionalMonthlyCents:null);
  });
}

// These check the testing machinery, not a DealerSource implementation.
test('Package integrity: catalog and fixture schema',()=>assert.deepEqual(validateData(catalog,fixtures),[]));
test('Package integrity: complete R01-R13 traceability',()=>assert.equal(new Set(catalog.criteria.flatMap(a=>a.requirementIds)).size,13));
test('Package integrity: zero dependencies and no long dashes',async()=>assert.equal((await validatePackage()).status,'PASS'));
test('Baseline: upstream README is byte-identical to the inspected Git blob',async()=>{
  const b=await readFile(path.join(qaRoot,'specification','UPSTREAM_README.md'));
  assert.equal(crypto.createHash('sha1').update(Buffer.concat([Buffer.from(`blob ${b.length}\0`),b])).digest('hex'),'a7f3fadf55c701d28e0af2d1c53e71f83543114c');
});
test('Baseline: master export matches its saved SHA-256',async()=>{
  const base=JSON.parse(await readFile(path.join(qaRoot,'specification','BASELINE.json'),'utf8'));
  const b=await readFile(path.join(qaRoot,'specification','MASTER_SPECIFICATION.md'));
  assert.equal(crypto.createHash('sha256').update(b).digest('hex'),base.master_export_sha256);
  assert.equal(base.application_present,false);
});
const mutations=[
 ['duplicate AC',(c,f)=>c.criteria.push(structuredClone(c.criteria[0]))],
 ['duplicate fixture',(c,f)=>f.cases.push(structuredClone(f.cases[0]))],
 ['missing AC reference',(c,f)=>f.cases[0].acId='AC-ABSENT-01'],
 ['missing reverse trace',(c,f)=>c.criteria[0].fixtureIds=[]],
 ['missing title',(c,f)=>c.criteria[0].title=''],
 ['unknown level',(c,f)=>c.criteria[0].level='pretend'],
 ['invalid priority',(c,f)=>c.criteria[0].priority='P99'],
 ['wrong requirement',(c,f)=>c.criteria[0].requirementIds=['R99']],
 ['invalid section',(c,f)=>c.criteria[0].specificationSections=['99']],
 ['invalid phase',(c,f)=>c.criteria[0].earliestPhase=9],
 ['invented pass',(c,f)=>c.criteria[0].status='PASS'],
 ['missing procedure',(c,f)=>c.criteria[0].steps=[]],
 ['bad operation',(c,f)=>f.cases[0].operation='../network'],
 ['no input',(c,f)=>f.cases[0].input=null],
 ['no expected output',(c,f)=>f.cases[0].expected=null],
 ['wrong provenance',(c,f)=>f.cases[0].provenance='live'],
 ['zero timeout',(c,f)=>f.cases[0].timeoutMs=0],
 ['locked mislabel',(c,f)=>f.visibility='locked'],
 ['unknown fixture reference',(c,f)=>c.criteria[0].fixtureIds.push('TC-NOPE-01-absent')],
 ['long dash',(c,f)=>c.criteria[0].title+=' '+String.fromCharCode(0x2014)],
 ['empty catalog',(c,f)=>c.criteria=[]],
 ['empty fixtures',(c,f)=>f.cases=[]],
 ['wrong schema',(c,f)=>c.schemaVersion=99],
];
for(const [name,mutate] of mutations) test(`Validator rejects ${name}`,()=>{
  const c=structuredClone(catalog),f=structuredClone(fixtures);mutate(c,f);assert.ok(validateData(c,f).length>0);
});

test('Comparator accepts an exact value',()=>assert.equal(compareResult({a:1},{a:1}).passed,true));
test('Comparator rejects an incorrect value',()=>assert.equal(compareResult({a:2},{a:1}).passed,false));
test('Comparator rejects missing keys',()=>assert.equal(compareResult({},{a:null}).passed,false));
test('Comparator rejects unexpected keys',()=>assert.equal(compareResult({a:1,allowed:true},{a:1}).passed,false));
test('Comparator does not coerce numeric strings',()=>assert.equal(compareResult({a:'1'},{a:1}).passed,false));
test('Comparator retains array order',()=>assert.equal(compareResult(['a','b'],['b','a']).passed,false));
test('Adapter metadata is mandatory',()=>assert.throws(()=>validateAdapter({operations:{}})));
test('Application adapter revision is mandatory',()=>assert.throws(()=>validateAdapter({implementation:{kind:'application'},operations:{}})));
test('Unknown adapter kind fails',()=>assert.throws(()=>validateAdapter({implementation:{kind:'anything'},operations:{}})));
test('Operations must be an object',()=>assert.throws(()=>validateAdapter({implementation:{kind:'missing'},operations:[]})));
test('Missing implementation is not a pass',async()=>assert.equal((await executeCase({implementation:{kind:'missing'},operations:{}},testcase)).status,'NOT_IMPLEMENTED'));
test('Missing method is not a pass',async()=>assert.equal((await executeCase(app({}),testcase)).status,'NOT_IMPLEMENTED'));
test('Declared test double is not credited as application coverage',async()=>assert.equal((await executeCase({implementation:{kind:'test-double'},operations:{sum:()=>({sum:5})}},testcase)).status,'TEST_DOUBLE_ONLY'));
test('Runner exercises a matching synthetic method',async()=>assert.equal((await executeCase(app({sum:({a,b})=>({sum:a+b})}),testcase)).status,'PASS'));
test('Runner detects a deliberately wrong synthetic method',async()=>assert.equal((await executeCase(app({sum:()=>({sum:0})}),testcase)).status,'FAIL'));
test('Application does not receive expected answers or AC IDs',async()=>{
  let keys; await executeCase(app({sum:input=>{keys=Object.keys(input);return {sum:input.a+input.b};}}),testcase);
  assert.deepEqual(keys,['a','b']);
});
test('Input mutation cannot poison the fixture',async()=>{
  await executeCase(app({sum:input=>{input.a=99;return {sum:5};}}),testcase);assert.equal(testcase.input.a,2);
});
test('Thrown NOT_IMPLEMENTED remains explicit',async()=>{
  const result=await executeCase(app({sum:()=>{const e=new Error('pending');e.code='NOT_IMPLEMENTED';throw e;}}),testcase);
  assert.equal(result.status,'NOT_IMPLEMENTED');
});
test('Unexpected exception is a failing contract',async()=>assert.equal((await executeCase(app({sum:()=>{throw new Error('bad');}}),testcase)).status,'FAIL'));
test('Async rejection is a failing contract',async()=>assert.equal((await executeCase(app({sum:async()=>{throw new Error('bad');}}),testcase)).status,'FAIL'));
test('Async timeout is detected',async()=>{
  const result=await executeCase(app({sum:()=>new Promise(()=>{})}),testcase,{timeoutMs:10});assert.equal(result.status,'FAIL');assert.match(result.reason,/CONTRACT_TIMEOUT/);
});
for(const [status,exitCode] of [['PASS',0],['FAIL',1],['NOT_IMPLEMENTED',2],['TEST_DOUBLE_ONLY',2],['HARNESS_ERROR',3]]) {
 test(`Summary gives ${status} exit ${exitCode} but never releases production`,()=>{
  const summary=summarizeResults([{...testcase,status}],[criterion]);assert.equal(summary.exitCode,exitCode);assert.equal(summary.releaseDecision,'BLOCKED');
 });
}
test('Manual criteria remain NOT_RUN after a passing synthetic contract',()=>{
  const sum=summarizeResults([{...testcase,status:'PASS'}],[criterion,{id:'AC-MANUAL-01',level:'manual',priority:'P0',fixtureIds:[]}]);
  assert.equal(sum.acceptance[1].status,'NOT_RUN');
});
test('Mixed fixture outcomes do not pass an AC',()=>{
  const cr={...criterion,fixtureIds:[testcase.id,'TC-HARNESS-01-second']};
  const sum=summarizeResults([{...testcase,status:'PASS'},{...testcase,id:'TC-HARNESS-01-second',status:'NOT_IMPLEMENTED'}],[cr]);
  assert.equal(sum.acceptance[0].status,'NOT_IMPLEMENTED');
});
test('Missing fixture results are not an AC pass',()=>assert.equal(summarizeResults([],[criterion]).acceptance[0].status,'NOT_RUN'));
test('CLI defaults stay inside qa',()=>assert.equal(parseArgs([]).adapter,path.join(qaRoot,'adapters','application.mjs')));
test('CLI accepts explicit adapter and report directory',()=>{const a=parseArgs(['--adapter','a.mjs','--out','out']);assert.equal(a.adapter,path.resolve('a.mjs'));assert.equal(a.out,path.resolve('out'));});
test('CLI help is supported',()=>assert.equal(parseArgs(['--help']).help,true));
for(const args of [['--unknown'],['--adapter'],['--adapter','--out'],['--out','x','--out','y'],['--help','x']]) test(`CLI rejects ${args.join(' ')}`,()=>assert.throws(()=>parseArgs(args)));

await mkdir(path.join(qaRoot,'.scratch'),{recursive:true});
const temp=await mkdtemp(path.join(qaRoot,'.scratch','harness-'));
test.after(async()=>{await rm(temp,{recursive:true,force:true});});
async function adapter(name,body){const p=path.join(temp,name+'.mjs');await writeFile(p,body);return p;}
const header="export const implementation={kind:'application',revision:'synthetic-harness-self-test'};\n";
test('Process isolation runs only the supplied input against a synthetic adapter',async()=>{
 const p=await adapter('sum',header+"export const operations={sum:({a,b})=>({sum:a+b})};");
 assert.equal((await runIsolated(p,testcase)).status,'PASS');
});
test('Process isolation bounds a synchronous infinite loop',async()=>{
 const p=await adapter('loop',header+"export const operations={sum:()=>{while(true){}}};");
 const r=await runIsolated(p,{...testcase,timeoutMs:50},{graceMs:100});assert.equal(r.status,'FAIL');assert.match(r.reason,/WORKER_TIMEOUT/);
});
test('Missing adapter file produces HARNESS_ERROR',async()=>assert.equal((await runIsolated(path.join(temp,'missing.mjs'),testcase)).status,'HARNESS_ERROR'));
test('Bad adapter metadata produces HARNESS_ERROR',async()=>{
 const p=await adapter('metadata','export const operations={};');assert.equal((await runIsolated(p,testcase)).status,'HARNESS_ERROR');
});
test('Protocol pollution is not a passing contract',async()=>{
 const p=await adapter('logs',"console.log('unexpected');"+header+"export const operations={sum:()=>({sum:5})};");
 assert.equal((await runIsolated(p,testcase)).status,'HARNESS_ERROR');
});
test('Excessive worker output is bounded',async()=>{
 const p=await adapter('overflow',header+"export const operations={sum:()=>{process.stdout.write('x'.repeat(100000));return {sum:5};}};");
 assert.equal((await runIsolated(p,testcase)).status,'HARNESS_ERROR');
});
for(const [name,body] of [
 ['fetch',"export const operations={sum:()=>fetch('https://example.invalid')};"],
 ['http',"import http from 'node:http';export const operations={sum:()=>http.get('http://example.invalid')};"],
 ['spawn',"import cp from 'node:child_process';export const operations={sum:()=>cp.spawn('echo',['never'])};"],
 ['socket',"import net from 'node:net';export const operations={sum:()=>new net.Socket().connect(443,'example.invalid')};"]]) {
 test(`Common ${name} side-effect path is blocked before execution`,async()=>{
  const p=await adapter(name,header+body);const r=await runIsolated(p,testcase);assert.equal(r.status,'FAIL');assert.match(r.reason,/OFFLINE_SIDE_EFFECT/);
 });
}
test('Credential-like environment value is not inherited by worker',async()=>{
 process.env.DEALERSOURCE_HARNESS_SENTINEL='synthetic-value-not-a-secret';
 try{const p=await adapter('env',header+"export const operations={sum:()=>({sum:process.env.DEALERSOURCE_HARNESS_SENTINEL?999:5})};");assert.equal((await runIsolated(p,testcase)).status,'PASS');}
 finally{delete process.env.DEALERSOURCE_HARNESS_SENTINEL;}
});
