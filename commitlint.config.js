// Commitlint Configuration for GraduateMatch
module.exports = {
  extends: ['@commitlint/config-conventional'],
  
  rules: {
    // Enforce specific types
    'type-enum': [2, 'always', [
      'feat',      // New feature
      'fix',       // Bug fix  
      'docs',      // Documentation changes
      'style',     // Code style (formatting, no logic change)
      'refactor',  // Code refactoring
      'perf',      // Performance improvements
      'test',      // Adding or fixing tests
      'build',     // Build system changes
      'ci',        // CI/CD changes
      'chore',     // Maintenance tasks
      'revert'     // Reverting changes
    ]],
    
    // Enforce specific scopes for our project
    'scope-enum': [2, 'always', [
      'auth',      // Authentication & authorization
      'api',       // Backend API changes
      'db',        // Database changes
      'matching',  // Job matching algorithm
      'ui',        // Frontend UI components
      'config',    // Configuration changes
      'app',       // Application-wide changes
      'workflows', // CI/CD and workflow changes
      'deps',      // Dependencies
      'release'    // Release-related changes
    ]],
    
    // Message format rules
    'header-max-length': [1, 'always', 72],
    'body-max-line-length': [1, 'always', 100],
      'subject-case': [1, 'always', 'lower-case'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'scope-case': [2, 'always', 'lower-case'],
    
    // Custom rules for our workflow
    'subject-min-length': [2, 'always', 10],
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [2, 'always']
  },
  
  // Custom plugins for additional validation
  plugins: [
    {
      rules: {
        'ticket-reference-in-footer': (parsed) => {
          const { footer } = parsed;
          if (!footer) return [true];
          
          // Check for issue references like "Closes: #123" or "Fixes: #456"
          const ticketPattern = /(Closes|Fixes|Refs?):\s*#\d+/i;
          return [
            ticketPattern.test(footer),
            'Footer should reference ticket numbers (e.g., "Closes: #123")'
          ];
        }
      }
    }
  ],
  
  // Ignore certain commit patterns (useful for automated commits)
  ignores: [
    (commit) => commit.includes('WIP'),
    (commit) => commit.includes('Merge branch'),
    (commit) => commit.includes('Merge pull request'),
    // Allow historical commits that may not fully conform
    (commit) => commit.includes('Add professional Git Flow'),
    (commit) => commit.includes('add complete monorepo'),
    (commit) => commit.includes('remove git flow')
  ],
  
  // Default commit message length
  defaultIgnores: true,
  helpUrl: 'https://github.com/conventional-changelog/commitlint/#what-is-commitlint'
};