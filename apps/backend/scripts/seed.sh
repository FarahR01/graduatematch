#!/bin/bash
set -euo pipefail

# Database Seeding Script
# Populates database with initial/test data

SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)
DB_URL="${DATABASE_URL}"

if [ -z "$DB_URL" ]; then
  echo "Error: DATABASE_URL environment variable not set"
  exit 1
fi

echo "[$(date +'%Y-%m-%d %H:%M:%S')] Starting database seeding..."

# Insert initial skills
psql "$DB_URL" << EOF
INSERT INTO skills (id, slug, label, "createdAt", "updatedAt")
VALUES
  (gen_random_uuid(), 'typescript', 'TypeScript', NOW(), NOW()),
  (gen_random_uuid(), 'nodejs', 'Node.js', NOW(), NOW()),
  (gen_random_uuid(), 'react', 'React', NOW(), NOW()),
  (gen_random_uuid(), 'postgresql', 'PostgreSQL', NOW(), NOW()),
  (gen_random_uuid(), 'docker', 'Docker', NOW(), NOW()),
  (gen_random_uuid(), 'aws', 'AWS', NOW(), NOW()),
  (gen_random_uuid(), 'git', 'Git', NOW(), NOW()),
  (gen_random_uuid(), 'rest-api', 'REST API', NOW(), NOW()),
  (gen_random_uuid(), 'graphql', 'GraphQL', NOW(), NOW()),
  (gen_random_uuid(), 'javascript', 'JavaScript', NOW(), NOW())
ON CONFLICT (slug) DO NOTHING;
EOF

# Insert initial badges
psql "$DB_URL" << EOF
INSERT INTO badges (id, code, name, criteria, "createdAt", "updatedAt")
VALUES
  (gen_random_uuid(), 'early-adopter', 'Early Adopter', '{"joined_in_first_month": true}'::jsonb, NOW(), NOW()),
  (gen_random_uuid(), 'skill-master', 'Skill Master', '{"min_skill_level": 4}'::jsonb, NOW(), NOW()),
  (gen_random_uuid(), 'job-seeker', 'Job Seeker', '{"applications_count": 10}'::jsonb, NOW(), NOW()),
  (gen_random_uuid(), 'hired', 'Hired', '{"application_accepted": true}'::jsonb, NOW(), NOW()),
  (gen_random_uuid(), 'experienced', 'Experienced', '{"years_of_experience": 5}'::jsonb, NOW(), NOW())
ON CONFLICT (code) DO NOTHING;
EOF

echo "[$(date +'%Y-%m-%d %H:%M:%S')] Database seeding completed successfully"
