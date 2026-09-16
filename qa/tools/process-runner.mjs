import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

export function runIsolated(adapterPath, testcase, { graceMs = 500 } = {}) {
  return new Promise(resolve => {
    const child = spawn(process.execPath, [fileURLToPath(new URL('./worker.mjs', import.meta.url))], {
      stdio: ['pipe', 'pipe', 'pipe'],
      env: { PATH: process.env.PATH ?? '', TZ: 'UTC', NODE_NO_WARNINGS: '1' }
    });
    const base = { id: testcase.id, acId: testcase.acId, operation: testcase.operation,
      provenance: 'synthetic-development-contract' };
    let stdout = '', stderr = '', timedOut = false, overflow = false, done = false;
    const finish = result => { if (done) return; done = true; clearTimeout(timer); resolve({ ...base, ...result }); };
    const timer = setTimeout(() => { timedOut = true; child.kill('SIGKILL'); }, (testcase.timeoutMs ?? 1500) + graceMs);
    child.stdout.on('data', chunk => { stdout += chunk; if (stdout.length > 65536) { overflow = true; child.kill('SIGKILL'); } });
    child.stderr.on('data', chunk => { if (stderr.length < 4096) stderr += chunk; });
    child.on('error', error => finish({ status: 'HARNESS_ERROR', reason: error.message }));
    child.stdin.on('error', () => {});
    child.on('close', code => {
      if (timedOut) return finish({ status: 'FAIL', reason: 'WORKER_TIMEOUT: isolated process exceeded its hard deadline.' });
      if (overflow) return finish({ status: 'HARNESS_ERROR', reason: 'Worker output exceeded the protocol limit.' });
      try {
        const result = JSON.parse(stdout);
        if (!['PASS','FAIL','NOT_IMPLEMENTED','TEST_DOUBLE_ONLY','HARNESS_ERROR'].includes(result.status)) throw new Error('Invalid worker result status.');
        finish(result);
      } catch (error) { finish({ status: 'HARNESS_ERROR', reason: `Worker protocol failure (exit ${code}): ${error.message}; ${stderr.slice(0, 1000)}` }); }
    });
    child.stdin.end(JSON.stringify({ adapterPath, testcase }));
  });
}
