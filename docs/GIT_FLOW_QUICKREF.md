# 🎯 Git Flow Quick Reference

## Daily Commands

### 🚀 Start Work
```bash
# Windows PowerShell
. .\scripts\git-workflow.ps1
gflow-status

# Linux/Mac Bash  
source scripts/git-workflow.sh
gf_status
```

### 🌟 Feature Development
```bash
# Start new feature
gflow-feature user-authentication

# Smart staging
gflow-add backend     # Stage backend changes
gflow-add ui          # Stage UI changes  
gflow-add config      # Stage config files
gflow-add packages    # Stage package changes

# Atomic commit
gflow-commit

# Sync with latest
gflow-sync

# Finish feature 
gflow-finish
```

### 🔧 Quick Fixes
```bash
# For hotfixes
gflow-hotfix critical-bug-name

# For releases  
gflow-release 1.2.0
```

## Commit Types Cheat Sheet

| Type | Quick Use | Example |
|------|-----------|---------|
| `feat` | ➕ New feature | `feat(auth): add login flow` |
| `fix` | 🐛 Bug fix | `fix(api): handle null responses` |
| `docs` | 📝 Documentation | `docs(readme): update setup guide` |
| `test` | 🧪 Tests | `test(auth): add login unit tests` |
| `chore` | 🔧 Maintenance | `chore(deps): upgrade TypeScript` |

## Scopes Reference

| Scope | Use For |
|-------|---------|
| `auth` | Login, JWT, authentication |
| `api` | Backend endpoints, services |  
| `ui` | React components, styling |
| `db` | Database, migrations |
| `matching` | Job matching algorithm |
| `config` | Build, environment setup |

## Branch Naming

| Pattern | Example |
|---------|---------|
| `feature/description` | `feature/user-dashboard` |
| `hotfix/description` | `hotfix/memory-leak-fix` |  
| `release/version` | `release/v1.2.0` |

## Atomic Staging Examples

```bash
# Stage specific file types
git add "*.ts" "*.tsx"           # TypeScript files
git add apps/backend/src/        # Backend only
git add apps/web/src/components/ # Components only

# Interactive staging (choose hunks)
git add --patch file.ts
```

## Emergency Commands

```bash
# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)  
git reset --hard HEAD~1

# Revert published commit
git revert <commit-hash>

# Switch branches with uncommitted changes
git stash
git checkout other-branch
git stash pop
```

## Git Aliases (Auto-configured)

```bash
git lg        # Pretty log graph
git st        # Short status
git unstage   # Unstage files
git last      # Show last commit
```

---
💡 **Pro Tips:**
- Always `gflow-sync` before starting new work
- Use `gflow-status` frequently to stay aware
- Commit early and often with focused messages
- Never `git add .` — be intentional with staging