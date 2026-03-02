# Git Flow Setup - Windows PowerShell Guide

## ✅ Fixed & Ready to Use!

Your Git Flow system has been successfully configured for professional development.

## 🚀 Quick Start

### 1. Load Git Flow Functions

```powershell
. .\scripts\git-workflow-fixed.ps1
```

**Or run the complete setup:**

```powershell
.\setup-git-flow-simple.ps1
```

### 2. Start Developing

```powershell
# Create a feature branch
gflow-feature user-authentication

# Make your changes, then stage atomically
gflow-add backend        # Stage backend changes
gflow-commit            # Create commit with template

# Or for interactive staging
gflow-add               # Uses git add --patch

# Finish and create PR
gflow-finish
```

## 📋 Available Commands

| Command | Purpose |
|---------|---------|
| `gflow-init` | Initialize Git Flow |
| `gflow-feature [name]` | Create feature branch |
| `gflow-finish` | Complete feature & create PR |
| `gflow-hotfix [name]` | Create hotfix branch |
| `gflow-release [version]` | Create release branch |
| `gflow-add [target]` | Smart staging (backend, web, docs, config) |
| `gflow-add` | Interactive patch-based staging |
| `gflow-commit` | Create atomic commit |
| `gflow-status` | Show repository status |
| `gflow-sync` | Sync with remote |
| `gflow-help` | Display all commands |

## 🎯 Smart Staging Targets

```powershell
gflow-add backend       # Stage: apps/backend/
gflow-add web           # Stage: apps/web/
gflow-add frontend      # Stage: apps/web/
gflow-add fe            # Stage: apps/web/
gflow-add docs          # Stage: apps/docs/
gflow-add packages      # Stage: packages/
gflow-add config        # Stage: *.json, *.yaml, *.yml, *.js, *.ts
gflow-add              # Interactive staging with git add --patch
```

## 📚 Documentation Files

- [GIT_FLOW_STRATEGY.md](../docs/GIT_FLOW_STRATEGY.md) - Complete strategy guide
- [GIT_FLOW_QUICKREF.md](../docs/GIT_FLOW_QUICKREF.md) - Quick reference
- [GIT_FLOW_IMPLEMENTATION.md](../docs/GIT_FLOW_IMPLEMENTATION.md) - Full implementation

## 🔄 Branch Naming Convention

| Type | Pattern | Example |
|------|---------|---------|
| Feature | `feature/<description>` | `feature/user-authentication` |
| Hotfix | `hotfix/<description>` | `hotfix/security-patch` |
| Release | `release/v<version>` | `release/v1.2.0` |

## 💬 Commit Message Format

```
<type>(<scope>): <short summary>

<body with details>

<footer with issue references>
```

### Types: `feat`, `fix`, `docs`, `test`, `chore`, `refactor`, `perf`, `build`, `ci`

### Scopes: `auth`, `api`, `db`, `matching`, `ui`, `config`, `deps`

## ✨ Example Workflow

```powershell
# Start feature
gflow-feature user-dashboard

# Edit backend service
gflow-add backend
gflow-commit
# Message: "feat(api): add user dashboard endpoint"

# Edit UI component
gflow-add ui
gflow-commit
# Message: "feat(ui): add dashboard layout"

# Run tests
gflow-add backend
gflow-commit
# Message: "test(api): add dashboard endpoint tests"

# Finish
gflow-finish
```

## ⚙️ Configuration Files

| File | Purpose |
|------|---------|
| `.gitmessage` | Commit message template |
| `commitlint.config.js` | Commit message validation rules |
| `.github/workflows/git-flow-validation.yml` | Automated quality gates |
| `scripts/git-workflow-fixed.ps1` | PowerShell Git Flow functions |

## 📝 Notes

- The `.gitmessage` file provides a template when you run `git commit`
- Use `git add --patch` for the most surgical staging control
- Commit messages are validated for Conventional Commits format
- Branch names must follow Git Flow naming conventions
- Atomic commits = one logical change per commit

## 🆘 Troubleshooting

### Script won't load

```powershell
# Set execution policy if needed
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Then load the script
. .\scripts\git-workflow-fixed.ps1
```

### Git alias issues

The PowerShell version uses `git config` directly. Bash-style aliases are set in the `.sh` script.

### Find recent commands

```powershell
gflow-help
```

---

**Ready to develop professionally!** Every commit now tells a focused, reversible, and collaborative story. 🚀