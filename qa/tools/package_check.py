"""Package and verify this test-only directory from a clean extraction."""
from pathlib import Path
import hashlib
import json
import subprocess
import tempfile
import zipfile

QA = Path(__file__).resolve().parents[1]
ROOT = QA.parent
ARCHIVE = ROOT.parent / 'dealersource-test-first-20260914.zip'

def files():
    return sorted(p for p in QA.rglob('*') if p.is_file() and not any(part in {'.scratch','node_modules','__pycache__'} for part in p.relative_to(QA).parts))

def archive():
    with zipfile.ZipFile(ARCHIVE,'w',zipfile.ZIP_DEFLATED) as z:
        for p in files():
            info=zipfile.ZipInfo(str(p.relative_to(ROOT)),date_time=(2026,9,14,0,0,0))
            info.compress_type=zipfile.ZIP_DEFLATED
            info.external_attr=0o100644 << 16
            z.writestr(info,p.read_bytes())
        assert z.testzip() is None

archive()
with tempfile.TemporaryDirectory(prefix='dealersource-clean-',dir=ROOT.parent) as td:
    clean=Path(td)
    with zipfile.ZipFile(ARCHIVE) as z:
        for name in z.namelist():
            assert not name.startswith('/') and '..' not in Path(name).parts
        z.extractall(clean)
    clean_qa=clean/'qa'
    original_hashes={str(p.relative_to(QA)):hashlib.sha256(p.read_bytes()).hexdigest() for p in files()}
    for relative,digest in original_hashes.items():
        assert hashlib.sha256((clean_qa/relative).read_bytes()).hexdigest()==digest
    run=subprocess.run(['node',str(clean_qa/'tools'/'run-all.mjs')],cwd=clean,capture_output=True,text=True,timeout=120)
    (QA/'reports'/'clean-extraction.log').write_text(run.stdout+run.stderr)
    assert run.returncode==2,(run.returncode,run.stdout,run.stderr)
    h=json.loads((clean_qa/'reports'/'harness-summary.json').read_text())
    c=json.loads((clean_qa/'reports'/'application-contracts.json').read_text())
    original_h=json.loads((QA/'reports'/'harness-summary.json').read_text())
    assert h['passed']==h['tests']==original_h['tests'] and h['failed']==h['skipped']==0
    assert c['counts']=={'NOT_IMPLEMENTED':142}
    assert c['acceptanceCounts']=={'NOT_IMPLEMENTED':101,'NOT_RUN':30}
    assert c['releaseDecision']=='BLOCKED'
    result={'scope':'Clean-extraction verification of the test package, not application acceptance',
        'status':'PASS','archive_bytes_verified':True,'baseline_exit_code':run.returncode,
        'harness_tests':h['tests'],'harness_passed':h['passed'],'harness_failed':h['failed'],
        'contract_cases':c['counts'],'acceptance_criteria':c['acceptanceCounts'],
        'production_release':'BLOCKED','new_credentials_or_network_required':False}
    (QA/'reports'/'clean-extraction.json').write_text(json.dumps(result,indent=2)+'\n')
    print(json.dumps(result,indent=2))

text='''# Verification evidence\n\nScope: the test package and authored fixtures only. No application or live integration was exercised.\n\n- Node.js: v24.14.1.\n- Package integrity: PASS, including R01-R13 traceability and no external dependencies.\n- Harness/fixture checks: {passed}/{tests} passed, zero failures and zero skips.\n- Application contracts: 142 NOT_IMPLEMENTED, intentional exit code 2.\n- Acceptance criteria: 101 NOT_IMPLEMENTED; 30 integration/manual NOT_RUN.\n- Clean extraction: archive byte hashes matched; rerun reproduced these outcomes.\n- Runtime model calls, live email/forms and paid integrations: none.\n- Production release: BLOCKED.\n\nThe harness tests include deliberately wrong synthetic outputs, missing/invalid adapters, protocol errors, asynchronous and synchronous timeouts, input isolation, CLI errors, common network/subprocess guards and environment isolation. Synthetic test adapters validate the runner only and are never presented as DealerSource implementation coverage.\n\nSee reports/harness.tap, harness-summary.json, package-validation.json, syntax-checks.json, application-contracts.json, application-contracts.txt, full-run.log and clean-extraction.json. The saved logs are reproducibility evidence; execution timestamps/durations differ on rerun.\n'''.format(passed=h['passed'],tests=h['tests'])
(QA/'VERIFICATION.md').write_text(text)
for p in files():
    if p.suffix in {'.md','.mjs','.json','.py','.csv','.txt','.tap','.log'}:
        content=p.read_text()
        assert '\u2013' not in content and '\u2014' not in content,str(p)
# Only documentation/reports have been added since the clean code-and-fixture run.
manifest_path=QA/'reports'/'final-archive-manifest.json'
manifest={str(p.relative_to(ROOT)):hashlib.sha256(p.read_bytes()).hexdigest() for p in files() if p!=manifest_path}
manifest_path.write_text(json.dumps({'archive':ARCHIVE.name,'fileCountExcludingManifest':len(manifest),'files':manifest},indent=2)+'\n')
archive()
with zipfile.ZipFile(ARCHIVE) as z:
    assert set(z.namelist())==set(manifest)|{str(manifest_path.relative_to(ROOT))}
    for name,digest in manifest.items(): assert hashlib.sha256(z.read(name)).hexdigest()==digest
    assert z.read(str(manifest_path.relative_to(ROOT)))==manifest_path.read_bytes()
    assert z.testzip() is None
print('Saved:',ARCHIVE)
print('Archive SHA-256:',hashlib.sha256(ARCHIVE.read_bytes()).hexdigest())
