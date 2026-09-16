#!/usr/bin/env bash
# Placeholder eval driver. Enumerates agent submodules and eval tasks.
# Replace the TODO block with real checks once prompts/task-spec.md is final.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
RAW="$ROOT/results/raw"
mkdir -p "$RAW"

if [ "$#" -gt 0 ]; then
  AGENTS=("$@")
else
  AGENTS=()
  for d in "$ROOT"/agents/*/; do AGENTS+=("$(basename "$d")"); done
fi

for agent in "${AGENTS[@]}"; do
  dir="$ROOT/agents/$agent"
  if [ ! -f "$dir/README.md" ]; then
    echo "[$agent] submodule not initialized (run: git submodule update --init --recursive)" >&2
    continue
  fi
  sha="$(git -C "$dir" rev-parse --short HEAD 2>/dev/null || echo unknown)"
  echo "== $agent @ $sha =="
  for task in "$ROOT"/evals/tasks/*.md; do
    name="$(basename "$task" .md)"
    echo "  - $name: TODO (not implemented)"
    # TODO: invoke the check described in $task against $dir,
    #       write output to "$RAW/$agent-$name.log"
  done
done
