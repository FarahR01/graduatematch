import { Injectable, BadRequestException } from '@nestjs/common';
import { JobRepository } from '../repositories/job.repository';
import { Job } from '../domain/job.entity';

/**
 * JobService - Business logic for Job operations
 */
@Injectable()
export class JobService {
  constructor(private readonly jobRepository: JobRepository) {}

  /**
   * Get job details
   */
  async getJobDetails(jobId: string): Promise<Job | null> {
    if (!jobId) throw new BadRequestException('Job ID is required');
    return this.jobRepository.findById(jobId);
  }

  /**
   * Get published jobs
   */
  async getPublishedJobs(): Promise<Job[]> {
    return this.jobRepository.findPublished();
  }

  /**
   * Get active jobs
   */
  async getActiveJobs(): Promise<Job[]> {
    return this.jobRepository.findActive();
  }

  /**
   * Get jobs by company
   */
  async getJobsByCompany(companyId: string): Promise<Job[]> {
    if (!companyId) throw new BadRequestException('Company ID is required');
    return this.jobRepository.findByCompany(companyId);
  }

  /**
   * Create job posting
   */
  async createJob(data: Partial<Job>): Promise<Job> {
    return this.jobRepository.create(data);
  }

  /**
   * Update job
   */
  async updateJob(jobId: string, data: Partial<Job>): Promise<Job | null> {
    if (!jobId) throw new BadRequestException('Job ID is required');
    return this.jobRepository.update(jobId, data);
  }

  /**
   * Delete job
   */
  async deleteJob(jobId: string): Promise<boolean> {
    if (!jobId) throw new BadRequestException('Job ID is required');
    return this.jobRepository.delete(jobId);
  }
}
