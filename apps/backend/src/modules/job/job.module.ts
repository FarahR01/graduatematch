import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job, JobSkill } from './domain';
import { JobRepository } from './repositories/job.repository';
import { JobService } from './services/job.service';
import { JobController } from './controllers/job.controller';

/**
 * JobModule - Feature module for Job management
 */
@Module({
  imports: [TypeOrmModule.forFeature([Job, JobSkill])],
  providers: [JobRepository, JobService],
  controllers: [JobController],
  exports: [JobService],
})
export class JobModule {}
