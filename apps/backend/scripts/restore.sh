#!/bin/bash
set -euo pipefail

# Database Restore Script
# Restores PostgreSQL database from a backup dump file

if [ -z "$1" ]; then
  echo "Usage: $0 <backup-file>"
  echo "Example: $0 .backups/app_20240101_120000.dump"
  exit 1
fi

BACKUP_FILE="$1"
DB_URL="${DATABASE_URL}"

if [ -z "$DB_URL" ]; then
  echo "Error: DATABASE_URL environment variable not set"
  exit 1
fi

if [ ! -f "$BACKUP_FILE" ]; then
  echo "Error: Backup file not found: $BACKUP_FILE"
  exit 1
fi

echo "[$(date +'%Y-%m-%d %H:%M:%S')] Starting restore from: $BACKUP_FILE"

if pg_restore "$DB_URL" -Fc -c "$BACKUP_FILE"; then
  echo "[$(date +'%Y-%m-%d %H:%M:%S')] Restore completed successfully"
else
  echo "Error: Restore failed"
  exit 1
fi
