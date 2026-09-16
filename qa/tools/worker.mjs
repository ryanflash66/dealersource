import { installOfflineGuard } from './offline-guard.mjs';
import { executeCase } from './runner-core.mjs';
import { pathToFileURL } from 'node:url';

let raw = '';
for await (const chunk of process.stdin) raw += chunk;
try {
  const { adapterPath, testcase } = JSON.parse(raw);
  installOfflineGuard();
  const adapter = await import(pathToFileURL(adapterPath).href);
  const result = await executeCase(adapter, testcase);
  process.stdout.write(JSON.stringify(result));
} catch (error) {
  process.stdout.write(JSON.stringify({ status: 'HARNESS_ERROR', reason: `${error.code ?? 'ERROR'}: ${String(error.message).slice(0, 2000)}` }));
}
