import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  User,
  Graduate,
  Company,
  Skill,
  Badge,
  Job,
  Application,
  GraduateSkill,
  JobSkill,
  GraduateBadge,
  MatchScore,
} from '../modules';

/**
 * DatabaseModule - Initializes TypeORM with NestJS
 * Registers all entities and configures the connection
 * Exports TypeOrmModule for use in feature modules
 */
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [
        User,
        Graduate,
        Company,
        Skill,
        Badge,
        Job,
        Application,
        GraduateSkill,
        JobSkill,
        GraduateBadge,
        MatchScore,
      ],
      synchronize: false,
      logging: process.env.NODE_ENV === 'development',
      maxQueryExecutionTime: 5000,
      extra: {
        max: Number(process.env.DB_POOL_MAX ?? 20),
        min: Number(process.env.DB_POOL_MIN ?? 5),
        idleTimeoutMillis: Number(process.env.DB_IDLE_TIMEOUT_MS ?? 30000),
        connectionTimeoutMillis: Number(process.env.DB_CONN_TIMEOUT_MS ?? 2000),
      },
    }),
    TypeOrmModule.forFeature([
      User,
      Graduate,
      Company,
      Skill,
      Badge,
      Job,
      Application,
      GraduateSkill,
      JobSkill,
      GraduateBadge,
      MatchScore,
    ]),
  ],
  exports: [TypeOrmModule],
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class DatabaseModule {}
