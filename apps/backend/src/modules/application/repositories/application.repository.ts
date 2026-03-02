import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from '../domain/application.entity';
import { BaseRepository } from '../../../common/repositories/base.repository';

/**
 * ApplicationRepository - Specialized repository for Application entity
 */
@Injectable()
export class ApplicationRepository extends BaseRepository<Application> {
  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
  ) {
    super(applicationRepository);
  }

  /**
   * Find applications for a job
   */
  async findByJobId(jobId: string): Promise<Application[]> {
    return this.applicationRepository.find({
      where: { jobId },
      relations: ['graduate', 'job'],
      order: { appliedAt: 'DESC' },
    });
  }

  /**
   * Find applications from a graduate
   */
  async findByGraduateId(graduateId: string): Promise<Application[]> {
    return this.applicationRepository.find({
      where: { graduateId },
      relations: ['job'],
      order: { appliedAt: 'DESC' },
    });
  }

  /**
   * Find application by job and graduate
   */
  async findByJobAndGraduate(jobId: string, graduateId: string): Promise<Application | null> {
    return this.applicationRepository.findOne({
      where: { jobId, graduateId },
      relations: ['job', 'graduate'],
    });
  }
}
