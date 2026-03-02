# GraduateMatch Git Flow Setup - Simple Version
# Professional Version Control Initialization

param([switch]$Force = $false)

Write-Host "==================================================================" -ForegroundColor Blue
Write-Host "             GRADUATEMATCH GIT FLOW SETUP" -ForegroundColor Blue  
Write-Host "         Professional Version Control Initialization" -ForegroundColor Blue
Write-Host "==================================================================" -ForegroundColor Blue

# Set commit message template
Write-Host "`nConfiguring Git settings..." -ForegroundColor Yellow
git config commit.template .gitmessage
git config pull.rebase false
git config push.default current
Write-Host "Git configuration complete!" -ForegroundColor Green

# Create develop branch if needed
$branches = git branch --list 2>$null
if (-not ($branches -match " develop$")) {
    git branch develop
    Write-Host "Develop branch created!" -ForegroundColor Green
} else {
    Write-Host "Develop branch already exists!" -ForegroundColor Green
}

# Load the workflow functions
Write-Host "`nLoading Git Flow functions..." -ForegroundColor Yellow
. .\scripts\git-workflow-fixed.ps1

Write-Host "`n==================================================================" -ForegroundColor Green
Write-Host "                    SETUP COMPLETE!" -ForegroundColor Green
Write-Host "==================================================================" -ForegroundColor Green

Write-Host "`nWhat's Been Configured:" -ForegroundColor Yellow
Write-Host "  - Conventional commit standards"
Write-Host "  - Branch naming conventions"
Write-Host "  - Git Flow workflow functions"
Write-Host "  - Main and develop branches"

Write-Host "`nNext Steps:" -ForegroundColor Cyan
Write-Host "  1. Start your first feature:"
Write-Host "     gflow-feature your-feature-name" -ForegroundColor Blue
Write-Host "  2. Make atomic commits:"
Write-Host "     gflow-add backend" -ForegroundColor Blue
Write-Host "     gflow-commit" -ForegroundColor Blue
Write-Host "  3. Finish feature:"
Write-Host "     gflow-finish" -ForegroundColor Blue

Write-Host "`nDocumentation:" -ForegroundColor Magenta
Write-Host "  - docs/GIT_FLOW_STRATEGY.md - Complete guide"
Write-Host "  - docs/GIT_FLOW_QUICKREF.md - Quick reference"
Write-Host "  - docs/GIT_FLOW_IMPLEMENTATION.md - Full implementation"

Write-Host "`nYou're ready for professional development!" -ForegroundColor Green
Write-Host "Remember: Every commit tells a story. Make yours count.`n" -ForegroundColor Yellow