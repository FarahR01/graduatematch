import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job, JobStatus } from '../domain/job.entity';
import { BaseRepository } from '../../../common/repositories/base.repository';

/**
 * JobRepository - Specialized repository for Job entity
 */
@Injectable()
export class JobRepository extends BaseRepository<Job> {
  constructor(@InjectRepository(Job) private jobRepository: Repository<Job>) {
    super(jobRepository);
  }

  /**
   * Find published jobs
   */
  async findPublished(): Promise<Job[]> {
    return this.jobRepository.find({
      where: { status: JobStatus.PUBLISHED },
      relations: ['company', 'skills'],
      order: { publishedAt: 'DESC' },
    });
  }

  /**
   * Find jobs by company
   */
  async findByCompany(companyId: string): Promise<Job[]> {
    return this.jobRepository.find({
      where: { companyId },
      relations: ['skills'],
    });
  }

  /**
   * Find active jobs (published and not closed)
   */
  async findActive(): Promise<Job[]> {
    return this.createQueryBuilder('job')
      .where('job.status = :status', { status: 'published' })
      .orderBy('job.publishedAt', 'DESC')
      .leftJoinAndSelect('job.skills', 'skills')
      .getMany();
  }
}
