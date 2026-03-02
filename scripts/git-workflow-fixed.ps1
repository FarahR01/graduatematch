# GraduateMatch Git Flow - PowerShell Edition
# Usage: . .\scripts\git-workflow-fixed.ps1

# Initialize Git Flow for the repository
function Initialize-GitFlow {
    Write-Host "[*] Initializing GraduateMatch Git Flow..." -ForegroundColor Blue
    
    git config commit.template .gitmessage
    
    if (Get-Command gh -ErrorAction SilentlyContinue) {
        Write-Host "[*] Setting up branch protection rules..." -ForegroundColor Yellow
        gh repo edit --allow-squash-merge --delete-branch-on-merge
    }
    
    Write-Host "[+] Git Flow initialized successfully!" -ForegroundColor Green
}

# Start a new feature branch
function Start-Feature {
    param([string]$FeatureName)
    
    if (-not $FeatureName) {
        Write-Host "[-] Usage: Start-Feature [feature-name]" -ForegroundColor Red
        Write-Host "[*] Example: Start-Feature user-authentication" -ForegroundColor Yellow
        return
    }
    
    $branchName = "feature/$FeatureName"
    git checkout develop 2>$null
    git pull origin develop 2>$null
    git checkout -b $branchName
    
    Write-Host "[+] Created feature branch: $branchName" -ForegroundColor Green
    Write-Host "[*] Remember to use atomic commits!" -ForegroundColor Yellow
}

# Finish a feature branch
function Finish-Feature {
    $currentBranch = git branch --show-current
    
    if (-not $currentBranch.StartsWith("feature/")) {
        Write-Host "[-] You must be on a feature branch" -ForegroundColor Red
        return
    }
    
    git push -u origin $currentBranch
    
    if (Get-Command gh -ErrorAction SilentlyContinue) {
        Write-Host "[*] Creating Pull Request..." -ForegroundColor Blue
        $title = $currentBranch -replace "feature/", ""
        gh pr create --base develop --title $title
    } else {
        Write-Host "[*] Please create a PR manually: $currentBranch to develop" -ForegroundColor Yellow
    }
}

# Start a hotfix branch
function Start-Hotfix {
    param([string]$HotfixName)
    
    if (-not $HotfixName) {
        Write-Host "[-] Usage: Start-Hotfix [hotfix-name]" -ForegroundColor Red
        return
    }
    
    $branchName = "hotfix/$HotfixName"
    git checkout main 2>$null
    git pull origin main 2>$null
    git checkout -b $branchName
    
    Write-Host "[+] Created hotfix branch: $branchName" -ForegroundColor Green
}

# Start a release branch
function Start-Release {
    param([string]$Version)
    
    if (-not $Version) {
        Write-Host "[-] Usage: Start-Release [version]" -ForegroundColor Red
        return
    }
    
    $branchName = "release/v$Version"
    git checkout develop 2>$null
    git pull origin develop 2>$null
    git checkout -b $branchName
    
    Write-Host "[+] Created release branch: $branchName" -ForegroundColor Green
    Write-Host "[*] Update version numbers and CHANGELOG.md" -ForegroundColor Yellow
}

# Smart staging function
function Add-Changes {
    param([string]$Target)
    
    if (-not $Target) {
        Write-Host "[*] Interactive staging mode:" -ForegroundColor Yellow
        git add --patch
        return
    }
    
    switch ($Target.ToLower()) {
        { $_ -in @("backend", "be") } {
            git add apps/backend/
            Write-Host "[+] Staged backend changes" -ForegroundColor Green
        }
        { $_ -in @("web", "frontend", "fe") } {
            git add apps/web/
            Write-Host "[+] Staged web frontend changes" -ForegroundColor Green
        }
        "docs" {
            git add apps/docs/
            Write-Host "[+] Staged documentation changes" -ForegroundColor Green
        }
        "packages" {
            git add packages/
            Write-Host "[+] Staged package changes" -ForegroundColor Green
        }
        "config" {
            git add "*.json" "*.yaml" "*.yml" "*.js" "*.ts" 2>$null
            Write-Host "[+] Staged configuration files" -ForegroundColor Green
        }
        default {
            git add $Target
            Write-Host "[+] Staged: $Target" -ForegroundColor Green
        }
    }
}

# Smart commit function
function Invoke-Commit {
    Write-Host "[*] Creating atomic commit..." -ForegroundColor Blue
    
    $stagedFiles = git diff --cached --name-only
    if (-not $stagedFiles) {
        Write-Host "[-] No changes staged" -ForegroundColor Red
        return
    }
    
    Write-Host "[*] Staged changes:" -ForegroundColor Yellow
    git diff --cached --name-status
    
    git commit
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "[+] Commit created successfully!" -ForegroundColor Green
    }
}

# Enhanced status function
function Get-GitStatus {
    Write-Host "[*] Repository Status:" -ForegroundColor Blue
    Write-Host ""
    
    Write-Host "Current Branch:" -ForegroundColor Yellow
    git branch --show-current
    Write-Host ""
    
    Write-Host "Staged Changes:" -ForegroundColor Yellow
    $staged = git diff --cached --name-status
    if ($staged) { Write-Host $staged } else { Write-Host "(none)" }
    Write-Host ""
    
    Write-Host "Unstaged Changes:" -ForegroundColor Yellow
    $unstaged = git diff --name-status
    if ($unstaged) { Write-Host $unstaged } else { Write-Host "(none)" }
    Write-Host ""
    
    Write-Host "Recent Commits:" -ForegroundColor Yellow
    git log --oneline -5
}

# Sync with remote
function Sync-Repository {
    $currentBranch = git branch --show-current
    Write-Host "[*] Syncing $currentBranch with remote..." -ForegroundColor Blue
    
    git fetch origin
    
    if ($currentBranch -in @("main", "develop")) {
        git pull origin $currentBranch
    } else {
        git pull origin develop --rebase
    }
    
    Write-Host "[+] Sync completed" -ForegroundColor Green
}

# Set up Git aliases
function Set-GitAliases {
    Write-Host "[*] Setting up Git aliases..." -ForegroundColor Blue
    
    git config alias.lg "log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)%an%Creset' --abbrev-commit"
    git config alias.st "status -s"
    git config alias.co "checkout"
    git config alias.br "branch"
    git config alias.unstage "reset HEAD --"
    git config alias.last "log -1 HEAD"
    
    Write-Host "[+] Git aliases configured!" -ForegroundColor Green
}

# Help function
function Show-GitFlowHelp {
    Write-Host "[*] GraduateMatch Git Flow Commands:" -ForegroundColor Blue
    Write-Host ""
    
    Write-Host "Setup:" -ForegroundColor Yellow
    Write-Host "  Initialize-GitFlow   - Initialize Git Flow"
    Write-Host "  Set-GitAliases       - Set up Git aliases"
    Write-Host ""
    
    Write-Host "Branching:" -ForegroundColor Yellow
    Write-Host "  Start-Feature        - Create feature branch"
    Write-Host "  Finish-Feature       - Complete feature"
    Write-Host "  Start-Hotfix         - Create hotfix branch"
    Write-Host "  Start-Release        - Create release branch"
    Write-Host ""
    
    Write-Host "Workflow:" -ForegroundColor Yellow
    Write-Host "  Add-Changes [target] - Stage changes (backend, web, docs, packages, config)"
    Write-Host "  Invoke-Commit        - Create atomic commit"
    Write-Host "  Get-GitStatus        - Show repository status"
    Write-Host "  Sync-Repository      - Sync with remote"
    Write-Host ""
    
    Write-Host "Examples:" -ForegroundColor Yellow
    Write-Host "  Start-Feature user-authentication"
    Write-Host "  Add-Changes backend"
    Write-Host "  Invoke-Commit"
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

# Load message
Write-Host "[*] GraduateMatch Git Flow loaded!" -ForegroundColor Green
Write-Host "[*] Run 'gflow-help' for commands" -ForegroundColor Yellow