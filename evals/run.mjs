#!/usr/bin/env node
/**
 * dealersource evaluator.
 *
 * For each agent submodule under agents/:
 *   1. fresh-clone the child at its pinned SHA into a temp dir
 *   2. install, run `npm test` with network disabled via env
 *   3. run the pipeline twice on a fixture set per spec section 14
 *   4. run once more with the geocoder switched in providers.yaml
 *   5. build the dashboard
 *   6. validate outputs against evals/contract/*.schema.json
 *   7. compare to <fixture>/expected.json
 *   8. write results/<agent>.md and results/raw/<agent>.json
 *   9. optionally post a leaderboard comment (--post)
 *
 * Zero dependencies. Node >= 20.
 *
 * Usage:
 *   node evals/run.mjs [agent ...] [--fixture evals/fixtures/golden-v1] [--post] [--keep]
 */
import { execSync, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync, rmSync, cpSync, readdirSync, statSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const flag = (n) => { const i = args.indexOf(n); return i >= 0 ? (args.splice(i, 1), true) : false; };
const opt = (n, d) => { const i = args.indexOf(n); if (i < 0) return d; const v = args[i + 1]; args.splice(i, 2); return v; };
const POST = flag("--post");
const KEEP = flag("--keep");
const FIXTURE = resolve(ROOT, opt("--fixture", "evals/fixtures/golden-v1"));
const RUN_DATE = opt("--run-date", JSON.parse(readFileSync(join(FIXTURE, "expected.json"), "utf8")).run_date);
const AGENTS = args.length ? args : readdirSync(join(ROOT, "agents")).filter((d) => d.endsWith("-solution") && statSync(join(ROOT, "agents", d)).isDirectory());

const expected = JSON.parse(readFileSync(join(FIXTURE, "expected.json"), "utf8"));
const schemas = Object.fromEntries(["report", "messages", "run"].map((n) => [n, JSON.parse(readFileSync(join(ROOT, "evals/contract", `${n}.schema.json`), "utf8"))]));

const OFFLINE_ENV = { ...process.env, DEALERSOURCE_OFFLINE: "1", CI: "1", NO_NETWORK: "1", HTTP_PROXY: "http://127.0.0.1:9", HTTPS_PROXY: "http://127.0.0.1:9", NO_PROXY: "" };
delete OFFLINE_ENV.SUPABASE_URL; delete OFFLINE_ENV.SUPABASE_KEY;

function sh(cmd, cwd, env = process.env, timeout = 15 * 60 * 1000) {
  const t0 = Date.now();
  const r = spawnSync(cmd, { cwd, env, shell: true, encoding: "utf8", timeout, maxBuffer: 64 * 1024 * 1024 });
  return { ok: r.status === 0, code: r.status, out: (r.stdout || "") + (r.stderr || ""), ms: Date.now() - t0 };
}
const readJson = (p) => { try { return JSON.parse(readFileSync(p, "utf8")); } catch { return undefined; } };

// ---------- minimal JSON Schema validator (subset used by our schemas) ----------
function validate(schema, data, root = schema, path = "$") {
  const errs = [];
  const s = schema.$ref ? root.$defs[schema.$ref.split("/").pop()] : schema;
  if (s.const !== undefined && data !== s.const) errs.push(`${path}: expected const ${JSON.stringify(s.const)}`);
  if (s.enum && !s.enum.includes(data)) errs.push(`${path}: ${JSON.stringify(data)} not in ${JSON.stringify(s.enum)}`);
  if (s.type) {
    const types = [].concat(s.type);
    const t = data === null ? "null" : Array.isArray(data) ? "array" : Number.isInteger(data) ? "integer" : typeof data;
    const ok = types.some((x) => x === t || (x === "number" && t === "integer"));
    if (!ok) { errs.push(`${path}: type ${t}, expected ${types.join("|")}`); return errs; }
  }
  if (typeof data === "string") {
    if (s.minLength && data.length < s.minLength) errs.push(`${path}: shorter than ${s.minLength}`);
    if (s.pattern && !new RegExp(s.pattern).test(data)) errs.push(`${path}: does not match ${s.pattern}`);
  }
  if (typeof data === "number" && s.minimum !== undefined && data < s.minimum) errs.push(`${path}: below minimum ${s.minimum}`);
  if (Array.isArray(data)) {
    if (s.minItems && data.length < s.minItems) errs.push(`${path}: fewer than ${s.minItems} items`);
    if (s.items) data.forEach((d, i) => errs.push(...validate(s.items, d, root, `${path}[${i}]`)));
  }
  if (data && typeof data === "object" && !Array.isArray(data)) {
    for (const r of s.required || []) if (!(r in data)) errs.push(`${path}: missing required "${r}"`);
    for (const [k, sub] of Object.entries(s.properties || {})) if (k in data) errs.push(...validate(sub, data[k], root, `${path}.${k}`));
    if (s.additionalProperties && typeof s.additionalProperties === "object") for (const [k, v] of Object.entries(data)) if (!(s.properties || {})[k]) errs.push(...validate(s.additionalProperties, v, root, `${path}.${k}`));
  }
  return errs;
}

// ---------- evaluation of one agent ----------
function evaluate(agent) {
  const childDir = join(ROOT, "agents", agent);
  const url = execSync(`git config -f .gitmodules submodule.agents/${agent}.url`, { cwd: ROOT, encoding: "utf8" }).trim();
  const sha = execSync("git rev-parse HEAD", { cwd: childDir, encoding: "utf8" }).trim();
  const parentSha = execSync("git rev-parse --short HEAD", { cwd: ROOT, encoding: "utf8" }).trim();
  const work = join(tmpdir(), "dealersource-eval", agent, sha.slice(0, 7));
  rmSync(work, { recursive: true, force: true }); mkdirSync(work, { recursive: true });
  const repo = join(work, "repo");
  const R = { agent, url, sha, parentSha, fixture: FIXTURE.replace(ROOT, ".").split("\\").join("/"), run_date: RUN_DATE, evaluated_at: new Date().toISOString(), conformance: [], quality: [], engineering: {}, notes: [] };
  const check = (list, name, ok, detail = "") => { list.push({ name, ok: !!ok, detail: String(detail).slice(0, 400) }); return ok; };

  // 1. fresh clone (prefer local object store so eval works before push; fall back to remote)
  let c = sh(`git clone -q "${childDir}" repo && git -C repo checkout -q ${sha}`, work);
  if (!c.ok) c = sh(`git clone -q "${url}" repo && git -C repo checkout -q ${sha}`, work);
  if (!check(R.conformance, "fresh clone", c.ok, c.out)) return finish(R, work);
  sh("git remote set-url origin " + JSON.stringify(url), repo);

  // 2. layout
  const pkg = readJson(join(repo, "package.json"));
  check(R.conformance, "package.json present", !!pkg);
  for (const s of ["test", "pipeline", "dashboard:build", "dashboard:dev"]) check(R.conformance, `script "${s}"`, pkg?.scripts?.[s], pkg?.scripts?.[s] || "missing");
  check(R.conformance, "providers.yaml present", existsSync(join(repo, "providers.yaml")));
  check(R.conformance, "business.yaml present", existsSync(join(repo, "business.yaml")));
  check(R.conformance, ".env.example present", existsSync(join(repo, ".env.example")));
  check(R.conformance, "no .env committed", !existsSync(join(repo, ".env")));
  const readme = existsSync(join(repo, "README.md")) ? readFileSync(join(repo, "README.md"), "utf8") : "";
  check(R.conformance, "README references parent prompts by URL", /github\.com\/ryanflash66\/dealersource\/.*prompts/.test(readme));
  check(R.conformance, "docs/decisions.md present", existsSync(join(repo, "docs/decisions.md")));

  // 3. install + test
  const pm = existsSync(join(repo, "pnpm-lock.yaml")) && sh("pnpm --version", repo).ok ? "pnpm" : "npm";
  const inst = sh(pm === "pnpm" ? "pnpm install --frozen-lockfile" : (existsSync(join(repo, "package-lock.json")) ? "npm ci" : "npm install"), repo, { ...process.env, CI: "1" });
  R.engineering.install_ms = inst.ms; R.engineering.package_manager = pm;
  if (!check(R.conformance, "install", inst.ok, inst.out.slice(-1500))) return finish(R, work);
  const test = sh(`${pm} test`, repo, OFFLINE_ENV);
  R.engineering.test_ms = test.ms;
  check(R.conformance, "npm test passes offline, no .env", test.ok, test.out.slice(-1500));
  R.engineering.test_summary = (test.out.match(/(\d+)\s+(passed|passing|tests? passed)/i) || [])[0] || "";

  // 4. pipeline run 1
  const out1 = join(work, "out1"); mkdirSync(out1);
  const pipe = (out, extra = "") => sh(`${pm} run pipeline -- --offline --fixtures "${join(FIXTURE, "input")}" --out "${out}" --run-date ${RUN_DATE} ${extra}`, repo, OFFLINE_ENV);
  const p1 = pipe(out1);
  R.engineering.pipeline_ms = p1.ms;
  if (!check(R.conformance, "pipeline run 1 exits 0", p1.ok, p1.out.slice(-1500))) return finish(R, work);
  const report = readJson(join(out1, "report.json")), messages = readJson(join(out1, "messages.json")), run = readJson(join(out1, "run.json"));
  check(R.conformance, "report.json written", !!report); check(R.conformance, "messages.json written", !!messages); check(R.conformance, "run.json written", !!run);
  if (report) { const e = validate(schemas.report, report); check(R.conformance, "report.json validates", e.length === 0, e.slice(0, 8).join("; ")); }
  if (messages) { const e = validate(schemas.messages, messages); check(R.conformance, "messages.json validates", e.length === 0, e.slice(0, 8).join("; ")); }
  if (run) { const e = validate(schemas.run, run); check(R.conformance, "run.json validates", e.length === 0, e.slice(0, 8).join("; ")); }
  if (report) {
    check(R.conformance, "offline flag true", report.offline === true);
    check(R.conformance, "external_calls empty", Array.isArray(report.external_calls) && report.external_calls.length === 0, JSON.stringify(report.external_calls));
    check(R.conformance, "paid_enabled false by default", report.providers?.paid_enabled === false);
  }

  // 5. pipeline run 2 (replay)
  const p2 = pipe(out1);
  check(R.conformance, "pipeline run 2 exits 0", p2.ok, p2.out.slice(-800));
  const messages2 = readJson(join(out1, "messages.json"));
  check(R.conformance, "replay sends nothing", Array.isArray(messages2) && messages2.length === expected.outreach_run2_count, `sent ${messages2?.length}`);

  // 6. provider switch
  const sw = expected.provider_switch;
  const provPath = join(repo, "providers.yaml");
  if (existsSync(provPath)) {
    const orig = readFileSync(provPath, "utf8");
    const alt = join(work, "providers.alt.yaml");
    writeFileSync(alt, orig.replace(new RegExp(`^(\\s*${sw.key}\\s*:\\s*)${sw.from}\\b`, "m"), `$1${sw.to}`));
    const out3 = join(work, "out3"); mkdirSync(out3);
    const p3 = pipe(out3, `--config "${alt}"`);
    const r3 = readJson(join(out3, "report.json"));
    check(R.conformance, `provider switch ${sw.key}: ${sw.from} -> ${sw.to} via config`, p3.ok && r3?.providers?.[sw.key] === sw.to, p3.ok ? `reported ${r3?.providers?.[sw.key]}` : p3.out.slice(-600));
    check(R.conformance, "providers.yaml default geocoder is census", /^\s*geocoder\s*:\s*census\b/m.test(orig));
  }

  // 7. dashboard build
  const db = sh(`${pm} run dashboard:build`, repo, OFFLINE_ENV);
  R.engineering.dashboard_build_ms = db.ms;
  check(R.conformance, "dashboard:build offline", db.ok, db.out.slice(-1000));

  // 8. quality vs expected
  if (report?.sites) {
    const byParcel = new Map(report.sites.map((s) => [s.parcel_id, s]));
    let gateChecks = 0, gateOk = 0;
    for (const [pid, ex] of Object.entries(expected.sites)) {
      const s = byParcel.get(pid);
      if (!check(R.quality, `${pid} present as a site`, !!s)) continue;
      check(R.quality, `${pid} dedupe: listings ${ex.listing_ids.join(",")}`, JSON.stringify([...s.listing_ids].sort()) === JSON.stringify([...ex.listing_ids].sort()), `got ${s.listing_ids.join(",")}`);
      check(R.quality, `${pid} in_search_area=${ex.in_search_area}`, s.in_search_area === ex.in_search_area, `got ${s.in_search_area}`);
      check(R.quality, `${pid} shared_lot=${ex.shared_lot}`, s.shared_lot === ex.shared_lot, `got ${s.shared_lot}`);
      check(R.quality, `${pid} viable=${ex.viable}`, s.viable === ex.viable, `got ${s.viable}`);
      if (ex.gates) for (const g of ["zoning", "rent", "flood"]) {
        gateChecks++; const ok = s.gates?.[g]?.status === ex.gates[g]; if (ok) gateOk++;
        check(R.quality, `${pid} gate ${g}=${ex.gates[g]}`, ok, `got ${s.gates?.[g]?.status}`);
        if (ok && ex.gates[g] === "pass") {
          const ev = (s.gates[g].evidence_ids || []).map((id) => report.evidence.find((e) => e.evidence_id === id)).filter(Boolean);
          check(R.quality, `${pid} gate ${g} has cited evidence with expiry`, ev.length > 0 && ev.every((e) => e.source_url && e.expires_at), `${ev.length} evidence rows`);
        }
      }
    }
    R.engineering.gate_accuracy = gateChecks ? +(gateOk / gateChecks).toFixed(3) : null;
    const extra = report.sites.filter((s) => !expected.sites[s.parcel_id]).map((s) => s.parcel_id);
    check(R.quality, "no unexpected sites", extra.length === 0, extra.join(","));
    const viable = report.sites.filter((s) => s.viable).sort((a, b) => (a.rank ?? 1e9) - (b.rank ?? 1e9)).map((s) => s.parcel_id);
    check(R.quality, `viable rank order ${expected.viable_rank_order.join(" > ")}`, JSON.stringify(viable) === JSON.stringify(expected.viable_rank_order), `got ${viable.join(" > ")}`);
    check(R.quality, "ranks are 1..n over viable only", report.sites.every((s) => (s.viable ? Number.isInteger(s.rank) && s.rank >= 1 : s.rank === null)));
  }
  if (Array.isArray(messages)) {
    const siteParcel = new Map((report?.sites || []).map((s) => [s.site_id, s.parcel_id]));
    const key = (m) => `${siteParcel.get(m.site_id) ?? m.site_id}|${m.case_type}|${m.to.toLowerCase()}`;
    const sent = messages.map(key);
    for (const o of expected.outreach_run1) check(R.quality, `outreach ${o.parcel_id} ${o.case_type} -> ${o.to}`, sent.includes(`${o.parcel_id}|${o.case_type}|${o.to}`));
    check(R.quality, "no duplicate outreach in run 1", new Set(sent).size === sent.length, `${sent.length - new Set(sent).size} dupes`);
    for (const pid of expected.no_outreach_parcels) check(R.quality, `no outreach for ${pid}`, !sent.some((k) => k.startsWith(pid + "|")));
    check(R.quality, "every message has a template_id", messages.every((m) => m.template_id));
  }

  // 9. engineering metrics
  const files = execSync("git ls-files", { cwd: repo, encoding: "utf8" }).split("\n").filter(Boolean);
  const src = files.filter((f) => /\.(ts|tsx|js|mjs|astro)$/.test(f) && !/node_modules|dist|fixtures?/.test(f));
  R.engineering.source_files = src.length;
  R.engineering.test_files = src.filter((f) => /(test|spec)\.|__tests__|\/tests?\//.test(f)).length;
  R.engineering.source_loc = src.reduce((n, f) => n + readFileSync(join(repo, f), "utf8").split("\n").length, 0);
  R.engineering.dependencies = Object.keys(pkg?.dependencies || {}).length;
  R.engineering.dev_dependencies = Object.keys(pkg?.devDependencies || {}).length;
  R.engineering.commits = +execSync("git rev-list --count HEAD", { cwd: repo, encoding: "utf8" }).trim();
  const first = execSync("git log --reverse --format=%cI | head -1", { cwd: repo, encoding: "utf8" }).trim();
  const last = execSync("git log -1 --format=%cI", { cwd: repo, encoding: "utf8" }).trim();
  R.engineering.first_commit = first; R.engineering.last_commit = last;
  R.engineering.wall_clock_hours = first && last ? +(((new Date(last) - new Date(first)) / 36e5).toFixed(2)) : null;
  R.engineering.typecheck = existsSync(join(repo, "tsconfig.json")) ? sh("npx tsc --noEmit -p .", repo, OFFLINE_ENV).ok : null;
  return finish(R, work);
}

function finish(R, work) {
  const pct = (l) => (l.length ? Math.round((100 * l.filter((c) => c.ok).length) / l.length) : 0);
  R.scores = { conformance_pct: pct(R.conformance), quality_pct: pct(R.quality), conformance: `${R.conformance.filter((c) => c.ok).length}/${R.conformance.length}`, quality: `${R.quality.filter((c) => c.ok).length}/${R.quality.length}` };
  if (!KEEP) rmSync(work, { recursive: true, force: true });
  return R;
}

// ---------- reporting ----------
function md(R) {
  const row = (c) => `| ${c.ok ? "✅" : "❌"} | ${c.name} | ${c.detail.replace(/\|/g, "\\|").replace(/\n/g, " ")} |`;
  const e = R.engineering;
  return `# Result: ${R.agent}

| | |
|---|---|
| Child repo | ${R.url.replace(/\.git$/, "")} |
| Child commit evaluated | \`${R.sha.slice(0, 7)}\` |
| Parent commit (spec + evals) | \`${R.parentSha}\` |
| Fixture | \`${R.fixture}\` @ run-date ${R.run_date} |
| Evaluated at | ${R.evaluated_at} |
| Evaluator | \`evals/run.mjs\` (automated) |

## Scores

| Dimension | Score |
|---|---|
| **Contract conformance** | **${R.scores.conformance_pct}%** (${R.scores.conformance}) |
| **Output quality vs expected** | **${R.scores.quality_pct}%** (${R.scores.quality}) |
| Gate accuracy | ${e.gate_accuracy ?? "n/a"} |

## Conformance (spec section 13 and 14)

| | Check | Detail |
|---|---|---|
${R.conformance.map(row).join("\n")}

## Output quality (vs \`expected.json\`)

| | Check | Detail |
|---|---|---|
${R.quality.length ? R.quality.map(row).join("\n") : "| ❌ | not evaluated | pipeline did not produce a report |"}

## Engineering metrics

| Metric | Value |
|---|---|
| Package manager | ${e.package_manager ?? ""} |
| Install time | ${e.install_ms != null ? (e.install_ms / 1000).toFixed(1) + " s" : ""} |
| Test time | ${e.test_ms != null ? (e.test_ms / 1000).toFixed(1) + " s" : ""} |
| Test summary | ${e.test_summary ?? ""} |
| Pipeline time (run 1) | ${e.pipeline_ms != null ? (e.pipeline_ms / 1000).toFixed(1) + " s" : ""} |
| Dashboard build time | ${e.dashboard_build_ms != null ? (e.dashboard_build_ms / 1000).toFixed(1) + " s" : ""} |
| Type-check clean | ${e.typecheck == null ? "n/a" : e.typecheck ? "yes" : "no"} |
| Source files / test files | ${e.source_files ?? ""} / ${e.test_files ?? ""} |
| Source lines | ${e.source_loc ?? ""} |
| Dependencies / dev | ${e.dependencies ?? ""} / ${e.dev_dependencies ?? ""} |
| Commits | ${e.commits ?? ""} |
| First to last commit | ${e.wall_clock_hours != null ? e.wall_clock_hours + " h" : ""} |

## Human-supplied (edit by hand)

| Item | Value |
|---|---|
| Human interventions | |
| Tokens / dollars | |
| Blind code-quality score (0-5) | |
| Blind README score (0-5) | |
| Notes | |
`;
}

function leaderboard(results) {
  const rows = results.sort((a, b) => b.scores.quality_pct - a.scores.quality_pct || b.scores.conformance_pct - a.scores.conformance_pct)
    .map((R, i) => `| ${i + 1} | ${R.agent} | \`${R.sha.slice(0, 7)}\` | ${R.scores.quality_pct}% | ${R.scores.conformance_pct}% | ${R.engineering.gate_accuracy ?? "n/a"} | ${R.engineering.test_files ?? ""} | ${R.engineering.source_loc ?? ""} | ${R.engineering.commits ?? ""} |`);
  return `**Eval ${new Date().toISOString().slice(0, 16).replace("T", " ")} UTC** · fixture \`${results[0]?.fixture}\` · parent \`${results[0]?.parentSha}\`

| # | Agent | Commit | Quality | Conformance | Gate acc. | Test files | LOC | Commits |
|---|---|---|---|---|---|---|---|---|
${rows.join("\n")}

Full per-agent tables: \`results/<agent>.md\` at parent commit \`${results[0]?.parentSha}\`.`;
}

// ---------- main ----------
mkdirSync(join(ROOT, "results/raw"), { recursive: true });
const results = [];
for (const agent of AGENTS) {
  if (!existsSync(join(ROOT, "agents", agent, ".git")) && !existsSync(join(ROOT, "agents", agent, "README.md"))) { console.error(`[${agent}] submodule not initialized`); continue; }
  console.log(`== ${agent} ==`);
  const R = evaluate(agent);
  writeFileSync(join(ROOT, "results/raw", `${agent}.json`), JSON.stringify(R, null, 2));
  writeFileSync(join(ROOT, "results", `${agent}.md`), md(R));
  console.log(`   conformance ${R.scores.conformance}  quality ${R.scores.quality}  -> results/${agent}.md`);
  results.push(R);
}
if (results.length) {
  const board = leaderboard(results);
  writeFileSync(join(ROOT, "results/raw", "leaderboard.md"), board);
  console.log("\n" + board);
  if (POST) {
    const issue = process.env.DEALERSOURCE_LEADERBOARD_ISSUE || "2";
    const f = join(ROOT, "results/raw", "leaderboard.md");
    const r = sh(`gh issue comment ${issue} -R ryanflash66/dealersource --body-file "${f}"`, ROOT);
    console.log(r.ok ? `posted to issue #${issue}` : `post failed: ${r.out}`);
  }
}
