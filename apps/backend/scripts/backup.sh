#!/bin/bash
set -euo pipefail

# Database Backup Script
# Backs up PostgreSQL database and automatically cleans up old backups (>7 days)

# Configuration
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="${BACKUP_DIR:-.backups}"
RETENTION_DAYS=7

# Database configuration
DB_URL="${DATABASE_URL}"
if [ -z "$DB_URL" ]; then
  echo "Error: DATABASE_URL environment variable not set"
  exit 1
fi

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Perform backup
echo "[$(date +'%Y-%m-%d %H:%M:%S')] Starting backup..."
BACKUP_FILE="$BACKUP_DIR/app_${TIMESTAMP}.dump"

if pg_dump "$DB_URL" -Fc -f "$BACKUP_FILE"; then
  FILE_SIZE=$(du -h "$BACKUP_FILE" | awk '{print $1}')
  echo "[$(date +'%Y-%m-%d %H:%M:%S')] Backup completed successfully"
  echo "[$(date +'%Y-%m-%d %H:%M:%S')] Backup file: $BACKUP_FILE (Size: $FILE_SIZE)"
else
  echo "Error: Backup failed"
  exit 1
fi

# Clean up old backups (older than RETENTION_DAYS)
echo "[$(date +'%Y-%m-%d %H:%M:%S')] Cleaning up old backups (older than $RETENTION_DAYS days)..."
OLD_COUNT=$(find "$BACKUP_DIR" -type f -name "app_*.dump" -mtime +$RETENTION_DAYS | wc -l)

if [ "$OLD_COUNT" -gt 0 ]; then
  find "$BACKUP_DIR" -type f -name "app_*.dump" -mtime +$RETENTION_DAYS -delete
  echo "[$(date +'%Y-%m-%d %H:%M:%S')] Deleted $OLD_COUNT old backup(s)"
else
  echo "[$(date +'%Y-%m-%d %H:%M:%S')] No old backups to delete"
fi

echo "[$(date +'%Y-%m-%d %H:%M:%S')] Backup process completed"
