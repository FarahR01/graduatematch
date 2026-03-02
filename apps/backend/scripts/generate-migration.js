#!/usr/bin/env node

const path = require('path');
const { execSync } = require('child_process');

// Get migration name from command line or use timestamp
const migrationName = process.argv[2] || `migration-${Date.now()}`;
const migrationPath = path.join('src/database/migrations', migrationName);

// Run typeorm migration:generate command
const command = `pnpm exec typeorm -d ormconfig.ts migration:generate ${migrationPath}`;

console.log(`Generating migration: ${migrationName}...`);

try {
  execSync(command, { stdio: 'inherit' });
  console.log(`\n✓ Migration generated: src/database/migrations/${migrationName}.ts`);
} catch (error) {
  console.error('Failed to generate migration');
  process.exit(1);
}
