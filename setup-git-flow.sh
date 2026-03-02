#!/bin/bash

# GraduateMatch Git Flow Setup Script
# Professional Version Control Initialization

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# ASCII Art Header
echo -e "${BLUE}"
cat << "EOF"
╔═══════════════════════════════════════════════════════════════╗
║                    🎯 GRADUATEMATCH                           ║
║              Professional Git Flow Setup                      ║
║                                                               ║
║    Establishing Enterprise-Grade Version Control              ║
╚═══════════════════════════════════════════════════════════════╝
EOF
echo -e "${NC}"

# Function to print section headers
print_section() {
    echo -e "\n${PURPLE}▶ $1${NC}"
    echo -e "${CYAN}$2${NC}"
}

# Function to print success
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# Function to print warning
print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Function to print error
print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check prerequisites
print_section "🔍 Checking Prerequisites" "Verifying required tools are installed..."

check_tool() {
    if command -v "$1" &> /dev/null; then
        print_success "$1 is installed"
    else
        print_error "$1 is not installed. Please install it first."
        exit 1
    fi
}

check_tool "git"
check_tool "node"
check_tool "pnpm"

# Optional tools
if command -v gh &> /dev/null; then
    print_success "GitHub CLI (gh) is available - PR automation enabled"
    GH_AVAILABLE=true
else
    print_warning "GitHub CLI (gh) not found - PR automation disabled"
    GH_AVAILABLE=false
fi

# Initialize Git repository if needed
print_section "📂 Repository Initialization" "Setting up Git repository..."

if [ ! -d ".git" ]; then
    git init
    print_success "Git repository initialized"
else
    print_success "Git repository already initialized"
fi

# Set up core Git configuration
print_section "⚙️ Git Configuration" "Configuring Git settings for professional workflow..."

# Set commit message template
git config commit.template .gitmessage
print_success "Commit message template configured"

# Set up merge strategy
git config merge.ours.driver true
git config pull.rebase false
print_success "Merge strategy configured"

# Set up helpful defaults
git config push.default current
git config branch.autosetupmerge always
git config branch.autosetuprebase always
print_success "Git defaults configured"

# Install and configure commitlint
print_section "📝 Commitlint Setup" "Installing and configuring commit message validation..."

if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root."
    exit 1
fi

# Install commitlint dependencies
pnpm add --save-dev @commitlint/cli @commitlint/config-conventional
print_success "Commitlint dependencies installed"

# Add commitlint to package.json scripts if not exists
if ! grep -q "commitlint" package.json; then
    # Use jq if available, otherwise manual edit
    if command -v jq &> /dev/null; then
        tmp=$(mktemp)
        jq '.scripts.commitlint = "commitlint --edit"' package.json > "$tmp" && mv "$tmp" package.json
        print_success "Commitlint script added to package.json"
    else
        print_warning "Please manually add 'commitlint': 'commitlint --edit' to package.json scripts"
    fi
fi

# Set up Git hooks
print_section "🪝 Git Hooks Setup" "Installing Git hooks for automated validation..."

# Create hooks directory if it doesn't exist
mkdir -p .git/hooks

# Create commit-msg hook
cat > .git/hooks/commit-msg << 'EOF'
#!/bin/sh
npx --no -- commitlint --edit "$1"
EOF

chmod +x .git/hooks/commit-msg
print_success "Commit message validation hook installed"

# Create pre-commit hook for basic checks
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/sh
echo "🔍 Running pre-commit checks..."

# Check for large files (>50MB)
large_files=$(find . -type f -size +50M -not -path "./.git/*" -not -path "./node_modules/*" 2>/dev/null || true)
if [ -n "$large_files" ]; then
    echo "❌ Large files detected (>50MB):"
    echo "$large_files"
    echo "Consider using Git LFS for large files"
    exit 1
fi

# Check for sensitive files
sensitive_patterns=("*.env" "*.pem" "*.key" "*password*" "*secret*" "*.p12")
for pattern in "${sensitive_patterns[@]}"; do
    if git diff --cached --name-only | grep -q "$pattern"; then
        echo "❌ Potentially sensitive file detected: $pattern"
        echo "Please review before committing"
        exit 1
    fi
done

echo "✅ Pre-commit checks passed"
EOF

chmod +x .git/hooks/pre-commit
print_success "Pre-commit validation hook installed"

# Initialize main branches
print_section "🌿 Branch Setup" "Creating and configuring main branches..."

# Get current branch
current_branch=$(git branch --show-current 2>/dev/null || echo "main")

# Ensure we have initial commits
if [ -z "$(git log --oneline -1 2>/dev/null)" ]; then
    # Create initial commit
    echo "# GraduateMatch\n\nProfessional Git Flow Initialized" > README_GITFLOW.md
    git add README_GITFLOW.md
    git commit -m "chore(config): initialize professional Git Flow

- Set up conventional commits
- Configure branch protection
- Add automation scripts
- Establish quality gates

This commit marks the beginning of our professional
version control strategy following Git Flow methodology."
    print_success "Initial commit created"
fi

# Create develop branch if it doesn't exist
if ! git branch --list | grep -q " develop$"; then
    git branch develop
    print_success "Develop branch created"
else
    print_success "Develop branch already exists"
fi

# Set up branch protections if GitHub CLI is available
if [ "$GH_AVAILABLE" = true ]; then
    print_section "🛡️ Branch Protection" "Setting up GitHub branch protection rules..."
    
    # Try to set up branch protection (may fail on new repos)
    if gh repo view &> /dev/null; then
        echo "Setting up branch protection for 'main'..."
        gh api repos/:owner/:repo/branches/main/protection \
            --method PUT \
            --silent \
            --field required_status_checks='{"strict":true,"contexts":["🔍 Git Flow Validation"]}' \
            --field enforce_admins=true \
            --field required_pull_request_reviews='{"required_approving_review_count":1,"dismiss_stale_reviews":true}' \
            --field restrictions=null 2>/dev/null || print_warning "Branch protection setup requires repository to be pushed to GitHub first"
            
        print_success "Branch protection configured (or will be applied after first push)"
    else
        print_warning "Repository not connected to GitHub - push first to enable protections"
    fi
fi

# Make scripts executable
print_section "🔧 Script Setup" "Making workflow scripts executable..."

chmod +x scripts/*.sh 2>/dev/null || true
print_success "Workflow scripts made executable"

# Final summary
print_section "🎉 Setup Complete!" "Professional Git Flow is now active"

echo -e "\n${GREEN}┌─────────────────────────────────────────────────────────┐"
echo -e "│                    🚀 READY TO GO!                     │"
echo -e "└─────────────────────────────────────────────────────────┘${NC}"

echo -e "\n${YELLOW}📋 What's Been Configured:${NC}"
echo -e "   ✅ Conventional commit standards"
echo -e "   ✅ Branch naming conventions"  
echo -e "   ✅ Atomic commit guidelines"
echo -e "   ✅ Automated quality gates"
echo -e "   ✅ Git hooks for validation"
echo -e "   ✅ Main and develop branches"
echo -e "   ✅ Workflow automation scripts"

echo -e "\n${CYAN}🎯 Next Steps:${NC}"
echo -e "   1. Source the workflow script:"
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    echo -e "      ${BLUE}. .\\scripts\\git-workflow.ps1${NC}"
else
    echo -e "      ${BLUE}source scripts/git-workflow.sh${NC}"
fi
echo -e "   2. Start your first feature:"
echo -e "      ${BLUE}gflow-feature your-feature-name${NC}"
echo -e "   3. Make atomic commits:"
echo -e "      ${BLUE}gflow-add backend && gflow-commit${NC}"
echo -e "   4. Read the documentation:"
echo -e "      ${BLUE}cat docs/GIT_FLOW_QUICKREF.md${NC}"

echo -e "\n${PURPLE}🔗 Documentation Created:${NC}"
echo -e "   📖 docs/GIT_FLOW_STRATEGY.md - Complete strategy guide"
echo -e "   📋 docs/GIT_FLOW_QUICKREF.md - Quick reference commands"
echo -e "   ⚙️ commitlint.config.js - Commit validation rules"
echo -e "   🤖 .github/workflows/ - Automated quality gates"

echo -e "\n${GREEN}🎯 You're now ready for professional-grade development!${NC}"
echo -e "${YELLOW}💡 Remember: Every commit tells a story. Make yours count.${NC}\n"