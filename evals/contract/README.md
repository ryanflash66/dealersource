# Offline contract

Machine-readable half of `prompts/task-spec.md` section 14. Every solution
must emit files that validate against these schemas when run as:

```
npm run pipeline -- --offline --fixtures <dir> --out <dir> --run-date YYYY-MM-DD [--config providers.yaml]
```

| File | Schema |
|---|---|
| `<out>/report.json` | `report.schema.json` |
| `<out>/messages.json` | `messages.schema.json` |
| `<out>/run.json` | `run.schema.json` |

Fixture **input** shape is described in the spec (14.3) and demonstrated by
`evals/fixtures/golden-v1/input/`. The evaluator (`evals/run.mjs`) validates
outputs against these schemas, then compares them to `expected.json`.

Schema changes bump `schema_version` and are recorded in
`results/summary.md` under comparability.
