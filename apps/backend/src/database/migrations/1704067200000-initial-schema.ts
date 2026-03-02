import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1704067200000 implements MigrationInterface {
  name = 'InitialSchema1704067200000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create extensions
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto"');

    // Create enums
    await queryRunner.query("CREATE TYPE \"user_role\" AS ENUM('graduate', 'company', 'admin')");
    await queryRunner.query("CREATE TYPE \"job_status\" AS ENUM('draft', 'published', 'closed')");
    await queryRunner.query(
      "CREATE TYPE \"application_status\" AS ENUM('submitted', 'reviewing', 'interview', 'accepted', 'rejected')"
    );

    // Users table
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "email" character varying(255) NOT NULL UNIQUE,
        "passwordHash" text NOT NULL,
        "role" "user_role" NOT NULL DEFAULT 'graduate',
        "isActive" boolean NOT NULL DEFAULT true,
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
      )
    `);
    await queryRunner.query('CREATE INDEX "idx_users_email" ON "users"("email")');
    await queryRunner.query('CREATE INDEX "idx_users_role" ON "users"("role")');

    // Skills table
    await queryRunner.query(`
      CREATE TABLE "skills" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "slug" character varying(120) NOT NULL UNIQUE,
        "label" character varying(120) NOT NULL,
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
      )
    `);
    await queryRunner.query('CREATE INDEX "idx_skills_slug" ON "skills"("slug")');

    // Badges table
    await queryRunner.query(`
      CREATE TABLE "badges" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "code" character varying(100) NOT NULL UNIQUE,
        "name" character varying(150) NOT NULL,
        "criteria" jsonb NOT NULL DEFAULT '{}',
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
      )
    `);
    await queryRunner.query('CREATE INDEX "idx_badges_code" ON "badges"("code")');

    // Graduates table
    await queryRunner.query(`
      CREATE TABLE "graduates" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "userId" uuid NOT NULL UNIQUE,
        "firstName" character varying(120) NOT NULL,
        "lastName" character varying(120) NOT NULL,
        "headline" character varying(255),
        "experienceYears" integer NOT NULL DEFAULT 0,
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE
      )
    `);
    await queryRunner.query('CREATE INDEX "idx_graduates_userId" ON "graduates"("userId")');

    // Companies table
    await queryRunner.query(`
      CREATE TABLE "companies" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "userId" uuid NOT NULL UNIQUE,
        "name" character varying(180) NOT NULL,
        "website" character varying(255),
        "size" integer,
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE
      )
    `);
    await queryRunner.query('CREATE INDEX "idx_companies_userId" ON "companies"("userId")');

    // Jobs table
    await queryRunner.query(`
      CREATE TABLE "jobs" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "companyId" uuid NOT NULL,
        "title" character varying(180) NOT NULL,
        "description" text NOT NULL,
        "location" character varying(150),
        "status" "job_status" NOT NULL DEFAULT 'draft',
        "publishedAt" TIMESTAMP WITH TIME ZONE,
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE
      )
    `);
    await queryRunner.query(
      'CREATE INDEX "idx_jobs_companyId_status" ON "jobs"("companyId", "status")'
    );
    await queryRunner.query('CREATE INDEX "idx_jobs_createdAt" ON "jobs"("createdAt" DESC)');
    await queryRunner.query('CREATE INDEX "idx_jobs_status" ON "jobs"("status")');

    // Applications table
    await queryRunner.query(`
      CREATE TABLE "applications" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "jobId" uuid NOT NULL,
        "graduateId" uuid NOT NULL,
        "status" "application_status" NOT NULL DEFAULT 'submitted',
        "coverLetter" text,
        "appliedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE CASCADE,
        FOREIGN KEY ("graduateId") REFERENCES "graduates"("id") ON DELETE CASCADE,
        CONSTRAINT "UQ_applications_jobId_graduateId" UNIQUE("jobId", "graduateId")
      )
    `);
    await queryRunner.query(
      'CREATE INDEX "idx_applications_jobId_status" ON "applications"("jobId", "status")'
    );
    await queryRunner.query(
      'CREATE INDEX "idx_applications_graduateId" ON "applications"("graduateId")'
    );
    await queryRunner.query(
      'CREATE INDEX "idx_applications_appliedAt" ON "applications"("appliedAt")'
    );

    // Graduate Skills table
    await queryRunner.query(`
      CREATE TABLE "graduate_skills" (
        "graduate_id" uuid NOT NULL,
        "skill_id" uuid NOT NULL,
        "level" smallint NOT NULL DEFAULT 1,
        PRIMARY KEY ("graduate_id", "skill_id"),
        FOREIGN KEY ("graduate_id") REFERENCES "graduates"("id") ON DELETE CASCADE,
        FOREIGN KEY ("skill_id") REFERENCES "skills"("id") ON DELETE CASCADE
      )
    `);
    await queryRunner.query(
      'CREATE INDEX "idx_graduate_skills_graduate_id" ON "graduate_skills"("graduate_id")'
    );
    await queryRunner.query(
      'CREATE INDEX "idx_graduate_skills_skill_id" ON "graduate_skills"("skill_id")'
    );

    // Job Skills table
    await queryRunner.query(`
      CREATE TABLE "job_skills" (
        "job_id" uuid NOT NULL,
        "skill_id" uuid NOT NULL,
        "weight" numeric(5,2) NOT NULL DEFAULT 1.00,
        PRIMARY KEY ("job_id", "skill_id"),
        FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE CASCADE,
        FOREIGN KEY ("skill_id") REFERENCES "skills"("id") ON DELETE CASCADE
      )
    `);
    await queryRunner.query('CREATE INDEX "idx_job_skills_job_id" ON "job_skills"("job_id")');
    await queryRunner.query('CREATE INDEX "idx_job_skills_skill_id" ON "job_skills"("skill_id")');

    // Graduate Badges table
    await queryRunner.query(`
      CREATE TABLE "graduate_badges" (
        "graduate_id" uuid NOT NULL,
        "badge_id" uuid NOT NULL,
        "awardedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        PRIMARY KEY ("graduate_id", "badge_id"),
        FOREIGN KEY ("graduate_id") REFERENCES "graduates"("id") ON DELETE CASCADE,
        FOREIGN KEY ("badge_id") REFERENCES "badges"("id") ON DELETE CASCADE
      )
    `);
    await queryRunner.query(
      'CREATE INDEX "idx_graduate_badges_graduate_id" ON "graduate_badges"("graduate_id")'
    );
    await queryRunner.query(
      'CREATE INDEX "idx_graduate_badges_badge_id" ON "graduate_badges"("badge_id")'
    );

    // Match Scores table
    await queryRunner.query(`
      CREATE TABLE "match_scores" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "jobId" uuid NOT NULL,
        "graduateId" uuid NOT NULL,
        "score" numeric(5,2) NOT NULL,
        "breakdown" jsonb NOT NULL DEFAULT '{}',
        "calculatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE CASCADE,
        FOREIGN KEY ("graduateId") REFERENCES "graduates"("id") ON DELETE CASCADE,
        CONSTRAINT "UQ_match_scores_jobId_graduateId" UNIQUE("jobId", "graduateId")
      )
    `);
    await queryRunner.query(
      'CREATE INDEX "idx_match_scores_jobId_score" ON "match_scores"("jobId", "score" DESC)'
    );
    await queryRunner.query(
      'CREATE INDEX "idx_match_scores_graduateId" ON "match_scores"("graduateId")'
    );
    await queryRunner.query(
      'CREATE INDEX "idx_match_scores_calculatedAt" ON "match_scores"("calculatedAt")'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop all tables in reverse order
    await queryRunner.query('DROP TABLE IF EXISTS "match_scores"');
    await queryRunner.query('DROP TABLE IF EXISTS "graduate_badges"');
    await queryRunner.query('DROP TABLE IF EXISTS "job_skills"');
    await queryRunner.query('DROP TABLE IF EXISTS "graduate_skills"');
    await queryRunner.query('DROP TABLE IF EXISTS "applications"');
    await queryRunner.query('DROP TABLE IF EXISTS "jobs"');
    await queryRunner.query('DROP TABLE IF EXISTS "companies"');
    await queryRunner.query('DROP TABLE IF EXISTS "graduates"');
    await queryRunner.query('DROP TABLE IF EXISTS "badges"');
    await queryRunner.query('DROP TABLE IF EXISTS "skills"');
    await queryRunner.query('DROP TABLE IF EXISTS "users"');

    // Drop enums
    await queryRunner.query('DROP TYPE IF EXISTS "application_status"');
    await queryRunner.query('DROP TYPE IF EXISTS "job_status"');
    await queryRunner.query('DROP TYPE IF EXISTS "user_role"');
  }
}
