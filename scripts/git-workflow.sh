#!/bin/bash

# GraduateMatch Git Flow Automation Scripts
# Usage: source scripts/git-workflow.sh

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Git Flow Functions

# Initialize Git Flow for the repository
gf_init() {
    echo -e "${BLUE}🚀 Initializing GraduateMatch Git Flow...${NC}"
    
    # Set commit message template
    git config commit.template .gitmessage
    
    # Set up branch protections (requires GitHub CLI)
    if command -v gh &> /dev/null; then
        echo -e "${YELLOW}📋 Setting up branch protection rules...${NC}"
        gh repo edit --allow-squash-merge --delete-branch-on-merge
        gh api repos/:owner/:repo/branches/main/protection \
            --method PUT \
            --field required_status_checks='{"strict":true,"contexts":[]}' \
            --field enforce_admins=true \
            --field required_pull_request_reviews='{"required_approving_review_count":1}' \
            --field restrictions=null
    fi
    
    echo -e "${GREEN}✅ Git Flow initialized successfully!${NC}"
}

# Start a new feature branch
gf_feature_start() {
    if [ -z "$1" ]; then
        echo -e "${RED}❌ Usage: gf_feature_start <feature-name>${NC}"
        echo "Example: gf_feature_start user-authentication"
        return 1
    fi
    
    local feature_name="feature/$1"
    
    # Ensure we're on develop and up to date
    git checkout develop
    git pull origin develop
    
    # Create and checkout feature branch
    git checkout -b "$feature_name"
    
    echo -e "${GREEN}✅ Created feature branch: $feature_name${NC}"
    echo -e "${YELLOW}💡 Remember to use atomic commits and conventional messages!${NC}"
}

# Finish a feature branch (create PR)
gf_feature_finish() {
    local current_branch=$(git branch --show-current)
    
    if [[ ! $current_branch == feature/* ]]; then
        echo -e "${RED}❌ You must be on a feature branch${NC}"
        return 1
    fi
    
    # Push feature branch
    git push -u origin "$current_branch"
    
    # Create PR using GitHub CLI if available
    if command -v gh &> /dev/null; then
        echo -e "${BLUE}🔄 Creating Pull Request...${NC}"
        gh pr create --base develop --title "${current_branch#feature/}" --body "## Changes\n\n- \n\n## Testing\n\n- [ ] Unit tests pass\n- [ ] Integration tests pass\n- [ ] Manual testing completed\n\n## Checklist\n\n- [ ] Code follows conventional commits\n- [ ] Documentation updated\n- [ ] No breaking changes or marked appropriately"
    else
        echo -e "${YELLOW}📋 Please create a PR manually from $current_branch to develop${NC}"
    fi
}

# Start a hotfix branch
gf_hotfix_start() {
    if [ -z "$1" ]; then
        echo -e "${RED}❌ Usage: gf_hotfix_start <hotfix-name>${NC}"
        return 1
    fi
    
    local hotfix_name="hotfix/$1"
    
    # Start from main
    git checkout main
    git pull origin main
    git checkout -b "$hotfix_name"
    
    echo -e "${GREEN}✅ Created hotfix branch: $hotfix_name${NC}"
}

# Start a release branch
gf_release_start() {
    if [ -z "$1" ]; then
        echo -e "${RED}❌ Usage: gf_release_start <version>${NC}"
        return 1
    fi
    
    local version="$1"
    local release_name="release/v$version"
    
    # Start from develop
    git checkout develop
    git pull origin develop
    git checkout -b "$release_name"
    
    echo -e "${GREEN}✅ Created release branch: $release_name${NC}"
    echo -e "${YELLOW}💡 Don't forget to update version numbers and changelog${NC}"
}

# Atomic staging function
gf_add() {
    if [ -z "$1" ]; then
        echo -e "${YELLOW}📋 Interactive staging mode:${NC}"
        git add --patch
    else
        case "$1" in
            "backend"|"be")
                git add apps/backend/
                echo -e "${GREEN}✅ Staged backend changes${NC}"
                ;;
            "web"|"frontend"|"fe")
                git add apps/web/
                echo -e "${GREEN}✅ Staged web frontend changes${NC}"
                ;;
            "docs")
                git add apps/docs/
                echo -e "${GREEN}✅ Staged documentation changes${NC}"
                ;;
            "packages")
                git add packages/
                echo -e "${GREEN}✅ Staged package changes${NC}"
                ;;
            "config")
                git add "*.json" "*.yaml" "*.yml" "*.js" "*.ts" --ignore-missing
                echo -e "${GREEN}✅ Staged configuration files${NC}"
                ;;
            *)
                git add "$1"
                echo -e "${GREEN}✅ Staged: $1${NC}"
                ;;
        esac
    fi
}

# Smart commit function with validation
gf_commit() {
    echo -e "${BLUE}📝 Creating atomic commit...${NC}"
    
    # Check if anything is staged
    if git diff --cached --quiet; then
        echo -e "${RED}❌ No changes staged. Use 'gf_add' to stage changes first.${NC}"
        return 1
    fi
    
    # Show staged changes
    echo -e "${YELLOW}📋 Staged changes:${NC}"
    git diff --cached --name-status
    
    # Commit with template
    git commit
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Commit created successfully!${NC}"
    fi
}

# Enhanced status function
gf_status() {
    echo -e "${BLUE}📊 Repository Status:${NC}"
    echo
    echo -e "${YELLOW}Current Branch:${NC}"
    git branch --show-current
    echo
    echo -e "${YELLOW}Staged Changes:${NC}"
    git diff --cached --name-status || echo "No staged changes"
    echo
    echo -e "${YELLOW}Unstaged Changes:${NC}"
    git diff --name-status || echo "No unstaged changes"
    echo
    echo -e "${YELLOW}Untracked Files:${NC}"
    git ls-files --others --exclude-standard || echo "No untracked files"
    echo
    echo -e "${YELLOW}Recent Commits:${NC}"
    git log --oneline -5
}

# Sync with remote
gf_sync() {
    local current_branch=$(git branch --show-current)
    echo -e "${BLUE}🔄 Syncing $current_branch with remote...${NC}"
    
    git fetch origin
    
    if [ "$current_branch" = "main" ] || [ "$current_branch" = "develop" ]; then
        git pull origin "$current_branch"
    else
        # For feature branches, rebase on develop
        git pull origin develop --rebase
    fi
    
    echo -e "${GREEN}✅ Sync completed${NC}"
}

# Git aliases setup
gf_aliases() {
    echo -e "${BLUE}⚙️ Setting up Git aliases...${NC}"
    
    # Conventional Commits aliases
    git config alias.feat '!f() { git commit -m "feat: $@"; }; f'
    git config alias.fix '!f() { git commit -m "fix: $@"; }; f'
    git config alias.docs '!f() { git commit -m "docs: $@"; }; f'
    git config alias.style '!f() { git commit -m "style: $@"; }; f'
    git config alias.refactor '!f() { git commit -m "refactor: $@"; }; f'
    git config alias.test '!f() { git commit -m "test: $@"; }; f'
    git config alias.chore '!f() { git commit -m "chore: $@"; }; f'
    
    # Enhanced log aliases
    git config alias.lg 'log --graph --pretty=format:"%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset" --abbrev-commit'
    git config alias.lga 'log --graph --pretty=format:"%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset" --abbrev-commit --all'
    
    # Useful shortcuts
    git config alias.st 'status -s'
    git config alias.co 'checkout'
    git config alias.br 'branch'
    git config alias.unstage 'reset HEAD --'
    git config alias.last 'log -1 HEAD'
    git config alias.visual '!gitk'
    
    echo -e "${GREEN}✅ Git aliases configured successfully!${NC}"
}

# Help function
gf_help() {
    echo -e "${BLUE}🎯 GraduateMatch Git Flow Commands:${NC}"
    echo
    echo -e "${YELLOW}Setup:${NC}"
    echo "  gf_init              - Initialize Git Flow for repository"
    echo "  gf_aliases           - Set up helpful Git aliases"
    echo
    echo -e "${YELLOW}Branching:${NC}"
    echo "  gf_feature_start     - Create new feature branch from develop"
    echo "  gf_feature_finish    - Complete feature and create PR"
    echo "  gf_hotfix_start      - Create hotfix branch from main"
    echo "  gf_release_start     - Create release branch from develop"
    echo
    echo -e "${YELLOW}Daily Workflow:${NC}"
    echo "  gf_add [target]      - Smart staging (backend, web, docs, packages, config)"
    echo "  gf_commit            - Create atomic commit with template"
    echo "  gf_status            - Enhanced status overview"
    echo "  gf_sync              - Sync current branch with remote"
    echo
    echo -e "${YELLOW}Examples:${NC}"
    echo "  gf_feature_start user-authentication"
    echo "  gf_add backend"
    echo "  gf_commit"
    echo "  gf_feature_finish"
}

# Auto-run help on source
echo -e "${GREEN}🎯 GraduateMatch Git Flow loaded!${NC}"
echo -e "${YELLOW}💡 Run 'gf_help' to see available commands${NC}"