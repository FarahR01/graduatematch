import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from '../domain/company.entity';
import { BaseRepository } from '../../../common/repositories/base.repository';

/**
 * CompanyRepository - Specialized repository for Company entity
 */
@Injectable()
export class CompanyRepository extends BaseRepository<Company> {
  constructor(@InjectRepository(Company) private companyRepository: Repository<Company>) {
    super(companyRepository);
  }

  /**
   * Find company by userId
   */
  async findByUserId(userId: string): Promise<Company | null> {
    return this.companyRepository.findOne({
      where: { userId },
      relations: ['jobs'],
    });
  }

  /**
   * Find company with jobs count
   */
  async getWithJobsCount(companyId: string): Promise<Company | null> {
    return this.companyRepository.findOne({
      where: { id: companyId },
      relations: ['jobs'],
    });
  }
}
