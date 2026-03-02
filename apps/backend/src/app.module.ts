import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { GraduateModule } from './modules/graduate/graduate.module';
import { CompanyModule } from './modules/company/company.module';
import { JobModule } from './modules/job/job.module';
import { ApplicationModule } from './modules/application/application.module';
import { SkillModule } from './modules/skill/skill.module';
import { BadgeModule } from './modules/badge/badge.module';
import { MatchScoreModule } from './modules/match-score/match-score.module';
import { AuthModule } from './modules/auth/auth.module';
import { HealthModule } from './health/health.module';
import { appConfig, databaseConfig, jwtConfig } from './config';

/**
 * AppModule - Root application module
 * Orchestrates all feature modules and configuration
 */
@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, jwtConfig],
      envFilePath: ['.env', '.env.local'],
    }),
    // Core modules
    DatabaseModule,
    HealthModule,
    // Feature modules
    AuthModule,
    UserModule,
    GraduateModule,
    CompanyModule,
    JobModule,
    ApplicationModule,
    SkillModule,
    BadgeModule,
    MatchScoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
