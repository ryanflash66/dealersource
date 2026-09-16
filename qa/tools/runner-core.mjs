import assert from 'node:assert/strict';

export function validateAdapter(adapter) {
  const metadata = adapter.implementation;
  if (!metadata || !['missing', 'test-double', 'application'].includes(metadata.kind)) {
    throw new Error('Adapter must declare implementation.kind: missing, test-double, or application.');
  }
  if (metadata.kind === 'application' && (typeof metadata.revision !== 'string' || !metadata.revision.trim())) {
    throw new Error('Application adapter must identify the implementation revision.');
  }
  if (!adapter.operations || typeof adapter.operations !== 'object' || Array.isArray(adapter.operations)) {
    throw new Error('Adapter operations must be an object of functions.');
  }
  return metadata;
}

export function compareResult(actual, expected) {
  try {
    assert.deepStrictEqual(actual, expected);
    return { passed: true, message: null };
  } catch (error) {
    return { passed: false, message: error.message.slice(0, 5000) };
  }
}

export async function executeCase(adapter, testcase, { timeoutMs = testcase.timeoutMs ?? 1500 } = {}) {
  const metadata = validateAdapter(adapter);
  const base = { id: testcase.id, acId: testcase.acId, operation: testcase.operation,
    provenance: 'synthetic-development-contract', implementationKind: metadata.kind };
  if (metadata.kind === 'missing' || typeof adapter.operations[testcase.operation] !== 'function') {
    return { ...base, status: 'NOT_IMPLEMENTED', reason: 'No application binding for this operation.' };
  }
  if (metadata.kind === 'test-double') {
    return { ...base, status: 'TEST_DOUBLE_ONLY', reason: 'Test doubles do not establish application coverage.' };
  }
  let timer;
  try {
    // Expected output and AC identifiers are not passed to application code.
    const input = structuredClone(testcase.input);
    const actual = await Promise.race([
      Promise.resolve().then(() => adapter.operations[testcase.operation](input)),
      new Promise((_, reject) => { timer = setTimeout(() => {
        const error = new Error('Operation exceeded the contract deadline.');
        error.code = 'CONTRACT_TIMEOUT'; reject(error);
      }, timeoutMs); })
    ]);
    const result = compareResult(actual, testcase.expected);
    return { ...base, status: result.passed ? 'PASS' : 'FAIL', reason: result.message };
  } catch (error) {
    const status = error.code === 'NOT_IMPLEMENTED' ? 'NOT_IMPLEMENTED' : 'FAIL';
    return { ...base, status, reason: `${error.code ?? 'ERROR'}: ${String(error.message).slice(0, 2000)}` };
  } finally { clearTimeout(timer); }
}

export function summarizeResults(results, criteria) {
  const counts = {};
  for (const result of results) counts[result.status] = (counts[result.status] ?? 0) + 1;
  const byAc = new Map();
  for (const result of results) {
    if (!byAc.has(result.acId)) byAc.set(result.acId, []);
    byAc.get(result.acId).push(result);
  }
  const acceptance = criteria.map(ac => {
    const linked = byAc.get(ac.id) ?? [];
    let status = 'NOT_RUN';
    if (ac.level === 'contract') {
      if (linked.some(r => r.status === 'FAIL')) status = 'FAIL';
      else if (linked.some(r => r.status === 'HARNESS_ERROR')) status = 'HARNESS_ERROR';
      else if (linked.some(r => r.status === 'NOT_IMPLEMENTED')) status = 'NOT_IMPLEMENTED';
      else if (linked.some(r => r.status === 'TEST_DOUBLE_ONLY')) status = 'TEST_DOUBLE_ONLY';
      else if (linked.length === ac.fixtureIds.length && linked.length > 0 && linked.every(r => r.status === 'PASS')) status = 'PASS';
    }
    return { id: ac.id, level: ac.level, priority: ac.priority, status, fixtureCount: linked.length };
  });
  const acCounts = {};
  for (const item of acceptance) acCounts[item.status] = (acCounts[item.status] ?? 0) + 1;
  // A public contract run alone can NEVER grant production release.
  const incomplete = acceptance.some(ac => ac.level === 'contract' && ac.status === 'NOT_RUN');
  const exitCode = counts.HARNESS_ERROR ? 3 : counts.FAIL ? 1 : counts.NOT_IMPLEMENTED || counts.TEST_DOUBLE_ONLY || incomplete ? 2 : 0;
  return { counts, acceptanceCounts: acCounts, acceptance, exitCode,
    contractChecksComplete: results.length > 0 && !incomplete && results.every(r => r.status === 'PASS'),
    releaseDecision: 'BLOCKED',
    releaseReason: 'Public development contracts are not live/manual evidence, a locked acceptance run, or PM release approval.' };
}
