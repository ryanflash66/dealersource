# Adding a new agent

Example: adding **Gemini** as `agents/gemini-solution` backed by
`ryanflash66/dealersource-gemini`.

## 1. Create the child repo

```bash
gh repo create ryanflash66/dealersource-gemini --public --description "dealersource solution by Gemini" --clone
cd dealersource-gemini
cat > README.md <<'MD'
# dealersource-gemini

Independent implementation of the dealersource task, produced by **Gemini**.
Owner: @ryanflash66. Parent repo: https://github.com/ryanflash66/dealersource
MD
git add README.md
git commit -m "Initialize dealersource-gemini"
git push -u origin main
cd ..
```

## 2. Wire it into the parent

```bash
cd dealersource
git submodule add -b main https://github.com/ryanflash66/dealersource-gemini.git agents/gemini-solution
```

## 3. Register it in the docs and results

- Add a row to the table in `agents/README.md`
- Add a row to the leaderboard in `results/summary.md`

## 4. Commit

```bash
git add .gitmodules agents/gemini-solution agents/README.md results/summary.md
git commit -m "Add gemini-solution submodule"
git push
```

## Removing an agent

```bash
git submodule deinit -f agents/gemini-solution
git rm -f agents/gemini-solution
rm -rf .git/modules/agents/gemini-solution
git commit -m "Remove gemini-solution submodule"
```
