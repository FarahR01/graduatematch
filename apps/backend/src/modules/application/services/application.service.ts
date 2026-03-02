import { Injectable, BadRequestException, ConflictException } from '@nestjs/common';
import { ApplicationRepository } from '../repositories/application.repository';
import { Application } from '../domain/application.entity';

/**
 * ApplicationService - Business logic for Application operations
 */
@Injectable()
export class ApplicationService {
  constructor(private readonly applicationRepository: ApplicationRepository) {}

  /**
   * Submit application
   */
  async submitApplication(data: Partial<Application>): Promise<Application> {
    const { jobId, graduateId } = data;
    if (!jobId || !graduateId) {
      throw new BadRequestException('Job ID and Graduate ID are required');
    }
    
    const exists = await this.applicationRepository.findByJobAndGraduate(jobId, graduateId);
    if (exists) {
      throw new ConflictException('Application already submitted for this job');
    }

    return this.applicationRepository.create(data);
  }

  /**
   * Get applications for a job
   */
  async getApplicationsForJob(jobId: string): Promise<Application[]> {
    if (!jobId) throw new BadRequestException('Job ID is required');
    return this.applicationRepository.findByJobId(jobId);
  }

  /**
   * Get applications from a graduate
   */
  async getApplicationsFromGraduate(graduateId: string): Promise<Application[]> {
    if (!graduateId) throw new BadRequestException('Graduate ID is required');
    return this.applicationRepository.findByGraduateId(graduateId);
  }

  /**
   * Update application status
   */
  async updateStatus(
    applicationId: string,
    status: string,
  ): Promise<Application | null> {
    if (!applicationId) throw new BadRequestException('Application ID is required');
    return this.applicationRepository.update(applicationId, { status } as Partial<Application>);
  }

  /**
   * Get application details
   */
  async getApplicationDetails(applicationId: string): Promise<Application | null> {
    if (!applicationId) throw new BadRequestException('Application ID is required');
    return this.applicationRepository.findById(applicationId);
  }
}
