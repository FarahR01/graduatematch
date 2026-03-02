# Git Flow Strategy & Standards
## GraduateMatch Professional Version Control

### Branching Strategy

#### Branch Types & Naming Conventions

| Branch Type | Naming Pattern | Purpose | Lifetime |
|-------------|---------------|---------|----------|
| **main** | `main` | Production releases | Permanent |
| **develop** | `develop` | Integration branch | Permanent |
| **feature** | `feature/<description>` | New features | Temporary |
| **release** | `release/v<semver>` | Release preparation | Temporary |
| **hotfix** | `hotfix/<description>` | Critical production fixes | Temporary |

#### Branch Naming Examples
```
✅ Good:
feature/user-authentication
feature/job-matching-algorithm
feature/api-rate-limiting
hotfix/security-vulnerability
hotfix/memory-leak-fix
release/v1.2.0

❌ Bad:
feature/stuff
fix/bug
user_auth
feature-123
```

### Conventional Commits Standard

#### Commit Message Structure
```
<type>(<scope>): <short summary>

<body>

<footer>
```

#### Commit Types

| Type | Description | When to Use |
|------|-------------|-------------|
| `feat` | New feature | Adding new functionality |
| `fix` | Bug fix | Fixing bugs or issues |
| `docs` | Documentation | README, inline docs, comments |
| `style` | Code style | Formatting, whitespace (no logic change) |
| `refactor` | Code refactoring | Code improvement without feature change |
| `perf` | Performance | Performance improvements |
| `test` | Testing | Adding or fixing tests |
| `build` | Build system | Build scripts, dependencies |
| `ci` | CI/CD | CI configuration, workflows |
| `chore` | Maintenance | Routine tasks, version bumps |
| `revert` | Revert | Reverting previous changes |

#### Scopes for GraduateMatch

| Scope | Description | Example Files |
|-------|-------------|---------------|
| `auth` | Authentication & authorization | JWT, login, signup flows |
| `api` | Backend API changes | Controllers, services, DTOs |
| `db` | Database related changes | Migrations, entities, queries |
| `matching` | Job matching algorithm | Scoring, recommendations |
| `ui` | Frontend user interface | Components, pages, layouts |
| `config` | Configuration changes | Environment, build configs |
| `deps` | Dependencies | Package updates, security patches |

#### Commit Message Examples

```bash
feat(auth): add JWT refresh token mechanism

Implement automatic token refresh to improve user experience
and reduce authentication-related interruptions.

- Add refresh token rotation
- Implement secure cookie storage
- Add token validation middleware

Closes: #123

fix(matching): resolve algorithm edge case for new graduates

The matching score calculation failed when graduates had no
prior experience. Added fallback scoring based on education
and skill potential.

- Handle null experience gracefully
- Add education-weight calculation
- Improve test coverage for edge cases

Fixes: #456

docs(api): update authentication endpoint documentation

Add comprehensive examples and error response documentation
for the authentication endpoints to improve developer experience.

BREAKING CHANGE: Authentication header format changed from
Bearer to JWT. Update all client implementations.

chore(deps): upgrade TypeScript to 5.3.0

Regular maintenance update to keep dependencies current.
No breaking changes expected.
```

### Atomic Commit Guidelines

#### Principle: One Logical Change = One Commit

**✅ Atomic Commit Examples:**
```bash
# Good: Single concern
feat(auth): add password validation rules
fix(ui): correct button alignment on mobile
docs(api): add endpoint rate limiting documentation

# Good: Related changes
feat(matching): implement job recommendation engine
- Add scoring algorithm
- Create recommendation service  
- Add recommendation DTOs
- Include comprehensive tests
```

**❌ Non-Atomic Examples:**
```bash
# Bad: Multiple unrelated changes
fix: various bugs and add new feature

# Bad: Too granular
feat(auth): add import statement
feat(auth): add interface definition  
feat(auth): add implementation
```

#### Staging Strategy

**Use `git add --patch` for surgical staging:**
```bash
# Interactive staging - choose hunks carefully
git add --patch

# Smart staging using our scripts
gflow-add backend    # Stage only backend changes
gflow-add config     # Stage only config files  
gflow-add ui         # Stage only UI changes
```

### Workflow Examples

#### 1. Feature Development Lifecycle

```bash
# Start new feature
gflow-feature user-profile-management
# Creates: feature/user-profile-management

# Make focused changes
# Edit: apps/backend/src/modules/user/user.service.ts
gflow-add backend
gflow-commit
# Message: "feat(user): add profile update service"

# Add tests  
# Edit: apps/backend/src/modules/user/user.service.spec.ts
gflow-add backend  
gflow-commit
# Message: "test(user): add profile service unit tests"

# Add frontend components
# Edit: apps/web/src/components/profile/ProfileForm.tsx
gflow-add ui
gflow-commit  
# Message: "feat(ui): add profile management form"

# Finish feature
gflow-finish
# Creates PR: feature/user-profile-management → develop
```

#### 2. Hotfix Workflow

```bash
# Critical bug in production
gflow-hotfix memory-leak-websocket

# Fix the issue
# Edit: apps/backend/src/modules/socket/socket.service.ts
gflow-add backend
gflow-commit
# Message: "fix(socket): resolve WebSocket memory leak"

# Push and create emergency PR
git push origin hotfix/memory-leak-websocket
gh pr create --base main --title "Critical: Fix WebSocket memory leak"
```

#### 3. Release Workflow

```bash
# Start release preparation  
gflow-release 1.2.0

# Update version numbers
# Edit: package.json, apps/*/package.json
gflow-add config
gflow-commit
# Message: "chore(release): bump version to 1.2.0"

# Update changelog
# Edit: CHANGELOG.md
gflow-add docs  
gflow-commit
# Message: "docs(release): update changelog for v1.2.0"

# Create release PR
git push origin release/v1.2.0
gh pr create --base main --title "Release v1.2.0"
```

### Linear History Strategy

#### Rebase vs Merge Guidelines

**Use Rebase For:**
- Feature branches syncing with develop
- Keeping linear history on feature branches
- Cleaning up commit history before PR

**Use Merge For:**
- Feature branches into develop (squash merge)
- Hotfixes into main
- Release branches into main

```bash
# Sync feature branch (rebase)
git pull origin develop --rebase

# Complete feature (squash merge via PR)
gh pr create --base develop

# Emergency hotfix (merge)  
git checkout main
git merge hotfix/critical-fix
git tag v1.1.1
```

### Quality Gates & Automation

#### Pre-commit Hooks Setup

```bash
# Install commitlint for message validation
npm install --save-dev @commitlint/config-conventional @commitlint/cli

# Add to package.json
"commitlint": {
  "extends": ["@commitlint/config-conventional"]
}
```

#### GitHub Actions Integration

```yaml
# .github/workflows/pr-validation.yml
name: PR Validation
on:
  pull_request:
    branches: [main, develop]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0
      
      - name: Validate commit messages
        uses: wagoid/commitlint-github-action@v5
      
      - name: Run tests
        run: pnpm test
      
      - name: Build check
        run: pnpm build
```

### Emergency Procedures

#### Reverting Changes

```bash
# Revert last commit
git revert HEAD

# Revert specific commit
git revert <commit-hash>

# Revert merge (use parent number)
git revert -m 1 <merge-commit-hash>
```

#### History Cleanup (Before PR)

```bash
# Interactive rebase to clean history
git rebase -i develop

# Squash commits, fix messages, reorder
# Only do this on feature branches before PR!
```

### Monitoring & Metrics

#### Track Git Flow Health

```bash
# Check commit message compliance
git log --oneline --grep="^(feat|fix|docs|style|refactor|perf|test|build|ci|chore):"

# Analyze branch lifecycle
git for-each-ref --format='%(refname:short) %(committerdate)' refs/heads

# Monitor atomic commit size
git log --stat --oneline | head -20
```

---

**Remember:** This is not just about saving files—it's about creating a professional, traceable, and collaborative project history that enables confident releases, easy debugging, and team scalability.