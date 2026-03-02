-- Create database if it doesn't exist
CREATE DATABASE graduatematch_dev 
  WITH 
  ENCODING = 'UTF8'
  LC_COLLATE = 'en_US.UTF-8'
  LC_CTYPE = 'en_US.UTF-8';

-- Grant all privileges to postgres user
GRANT ALL PRIVILEGES ON DATABASE graduatematch_dev TO postgres;

-- Connect to the new database and create extensions
\c graduatematch_dev

-- Create useful extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
