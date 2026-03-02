# GraduateMatch Git Flow - PowerShell Edition
# Usage: . .\scripts\git-workflow.ps1

# Initialize Git Flow for the repository
function Initialize-GitFlow {
    Write-Host "🚀 Initializing GraduateMatch Git Flow..." -ForegroundColor Blue
    
    # Set commit message template
    git config commit.template .gitmessage
    
    # Set up branch protections (requires GitHub CLI)
    if (Get-Command gh -ErrorAction SilentlyContinue) {
        Write-Host "📋 Setting up branch protection rules..." -ForegroundColor Yellow
        gh repo edit --allow-squash-merge --delete-branch-on-merge
    }
    
    Write-Host "✅ Git Flow initialized successfully!" -ForegroundColor Green
}

# Start a new feature branch
function Start-Feature {
    param([string]$FeatureName)
    
    if (-not $FeatureName) {
        Write-Host "Usage: Start-Feature [feature-name]" -ForegroundColor Red
        Write-Host "Example: Start-Feature user-authentication" -ForegroundColor Yellow
        return
    }
    
    $branchName = "feature/$FeatureName"
    
    # Ensure we're on develop and up to date
    git checkout develop
    git pull origin develop
    
    # Create and checkout feature branch
    git checkout -b $branchName
    
    Write-Host "✅ Created feature branch: $branchName" -ForegroundColor Green
    Write-Host "💡 Remember to use atomic commits and conventional messages!" -ForegroundColor Yellow
}

# Finish a feature branch
function Finish-Feature {
    $currentBranch = git branch --show-current
    
    if (-not $currentBranch.StartsWith("feature/")) {
        Write-Host "❌ You must be on a feature branch" -ForegroundColor Red
        return
    }
    
    # Push feature branch
    git push -u origin $currentBranch
    
    # Create PR using GitHub CLI if available
    if (Get-Command gh -ErrorAction SilentlyContinue) {
        Write-Host "🔄 Creating Pull Request..." -ForegroundColor Blue
        $title = $currentBranch -replace "feature/", ""
        $body = "## Changes`n`n- `n`n## Testing`n`n- [ ] Unit tests pass`n- [ ] Integration tests pass`n- [ ] Manual testing completed`n`n## Checklist`n`n- [ ] Code follows conventional commits`n- [ ] Documentation updated`n- [ ] No breaking changes or marked appropriately"
        gh pr create --base develop --title $title --body $body
    } else {
        Write-Host "📋 Please create a PR manually from $currentBranch to develop" -ForegroundColor Yellow
    }
}

# Start a hotfix branch
function Start-Hotfix {
    param([string]$HotfixName)
    
    if (-not $HotfixName) {
        Write-Host "❌ Usage: Start-Hotfix <hotfix-name>" -ForegroundColor Red
        return
    }
    
    $branchName = "hotfix/$HotfixName"
    
    # Start from main
    git checkout main
    git pull origin main
    git checkout -b $branchName
    
    Write-Host "✅ Created hotfix branch: $branchName" -ForegroundColor Green
}

# Start a release branch
function Start-Release {
    param([string]$Version)
    
    if (-not $Version) {
        Write-Host "❌ Usage: Start-Release <version>" -ForegroundColor Red
        return
    }
    
    $branchName = "release/v$Version"
    
    # Start from develop
    git checkout develop
    git pull origin develop
    git checkout -b $branchName
    
    Write-Host "✅ Created release branch: $branchName" -ForegroundColor Green
    Write-Host "💡 Don't forget to update version numbers and changelog" -ForegroundColor Yellow
}

# Smart staging function
function Add-Changes {
    param([string]$Target)
    
    if (-not $Target) {
        Write-Host "📋 Interactive staging mode:" -ForegroundColor Yellow
        git add --patch
        return
    }
    
    switch ($Target.ToLower()) {
        { $_ -in @("backend", "be") } {
            git add apps/backend/
            Write-Host "✅ Staged backend changes" -ForegroundColor Green
        }
        { $_ -in @("web", "frontend", "fe") } {
            git add apps/web/
            Write-Host "✅ Staged web frontend changes" -ForegroundColor Green
        }
        "docs" {
            git add apps/docs/
            Write-Host "✅ Staged documentation changes" -ForegroundColor Green
        }
        "packages" {
            git add packages/
            Write-Host "✅ Staged package changes" -ForegroundColor Green
        }
        "config" {
            git add "*.json" "*.yaml" "*.yml" "*.js" "*.ts"
            Write-Host "✅ Staged configuration files" -ForegroundColor Green
        }
        default {
            git add $Target
            Write-Host "✅ Staged: $Target" -ForegroundColor Green
        }
    }
}

# Smart commit function
function Invoke-Commit {
    Write-Host "📝 Creating atomic commit..." -ForegroundColor Blue
    
    # Check if anything is staged
    $stagedFiles = git diff --cached --name-only
    if (-not $stagedFiles) {
        Write-Host "❌ No changes staged. Use 'Add-Changes' to stage changes first." -ForegroundColor Red
        return
    }
    
    # Show staged changes
    Write-Host "📋 Staged changes:" -ForegroundColor Yellow
    git diff --cached --name-status
    
    # Commit with template
    git commit
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Commit created successfully!" -ForegroundColor Green
    }
}

# Enhanced status function
function Get-GitStatus {
    Write-Host "📊 Repository Status:" -ForegroundColor Blue
    Write-Host ""
    
    Write-Host "Current Branch:" -ForegroundColor Yellow
    git branch --show-current
    Write-Host ""
    
    Write-Host "Staged Changes:" -ForegroundColor Yellow
    $staged = git diff --cached --name-status
    if ($staged) { $staged } else { Write-Host "No staged changes" }
    Write-Host ""
    
    Write-Host "Unstaged Changes:" -ForegroundColor Yellow
    $unstaged = git diff --name-status
    if ($unstaged) { $unstaged } else { Write-Host "No unstaged changes" }
    Write-Host ""
    
    Write-Host "Untracked Files:" -ForegroundColor Yellow
    $untracked = git ls-files --others --exclude-standard
    if ($untracked) { $untracked } else { Write-Host "No untracked files" }
    Write-Host ""
    
    Write-Host "Recent Commits:" -ForegroundColor Yellow
    git log --oneline -5
}

# Sync with remote
function Sync-Repository {
    $currentBranch = git branch --show-current
    Write-Host "🔄 Syncing $currentBranch with remote..." -ForegroundColor Blue
    
    git fetch origin
    
    if ($currentBranch -in @("main", "develop")) {
        git pull origin $currentBranch
    } else {
        # For feature branches, rebase on develop
        git pull origin develop --rebase
    }
    
    Write-Host "✅ Sync completed" -ForegroundColor Green
}

# Set up Git aliases
function Set-GitAliases {
    Write-Host "Setting up Git aliases..." -ForegroundColor Blue
    
    # Enhanced log aliases
    git config alias.lg "log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)%an%Creset' --abbrev-commit"
    git config alias.lga "log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)%an%Creset' --abbrev-commit --all"
    
    # Useful shortcuts
    git config alias.st "status -s"
    git config alias.co "checkout"
    git config alias.br "branch"
    git config alias.unstage "reset HEAD --"
    git config alias.last "log -1 HEAD"
    
    Write-Host "Git aliases configured successfully!" -ForegroundColor Green
    Write-Host "Note: For quick commit shortcuts, use git commit -m 'feat: message' directly" -ForegroundColor Yellow
}

# Help function
function Show-GitFlowHelp {
    Write-Host "🎯 GraduateMatch Git Flow Commands:" -ForegroundColor Blue
    Write-Host ""
    
    Write-Host "Setup:" -ForegroundColor Yellow
    Write-Host "  Initialize-GitFlow   - Initialize Git Flow for repository"
    Write-Host "  Set-GitAliases       - Set up helpful Git aliases"
    Write-Host ""
    
    Write-Host "Branching:" -ForegroundColor Yellow
    Write-Host "  Start-Feature        - Create new feature branch from develop"
    Write-Host "  Finish-Feature       - Complete feature and create PR"
    Write-Host "  Start-Hotfix         - Create hotfix branch from main"
    Write-Host "  Start-Release        - Create release branch from develop"
    Write-Host ""
    
    Write-Host "Daily Workflow:" -ForegroundColor Yellow
    Write-Host "  Add-Changes [target] - Smart staging (backend, web, docs, packages, config)"
    Write-Host "  Invoke-Commit        - Create atomic commit with template"
    Write-Host "  Get-GitStatus        - Enhanced status overview"
    Write-Host "  Sync-Repository      - Sync current branch with remote"
    Write-Host ""
    
    Write-Host "Examples:" -ForegroundColor Yellow
    Write-Host "  Start-Feature user-authentication"
    Write-Host "  Add-Changes backend"
    Write-Host "  Invoke-Commit"
    Write-Host "  Finish-Feature"
}

# Create aliases for easier use
Set-Alias -Name gflow-init -Value Initialize-GitFlow
Set-Alias -Name gflow-feature -Value Start-Feature
Set-Alias -Name gflow-finish -Value Finish-Feature
Set-Alias -Name gflow-hotfix -Value Start-Hotfix  
Set-Alias -Name gflow-release -Value Start-Release
Set-Alias -Name gflow-add -Value Add-Changes
Set-Alias -Name gflow-commit -Value Invoke-Commit
Set-Alias -Name gflow-status -Value Get-GitStatus
Set-Alias -Name gflow-sync -Value Sync-Repository
Set-Alias -Name gflow-help -Value Show-GitFlowHelp

# Auto-run help on load
Write-Host "🎯 GraduateMatch Git Flow loaded!" -ForegroundColor Green
Write-Host "💡 Run 'gflow-help' to see available commands" -ForegroundColor Yellow