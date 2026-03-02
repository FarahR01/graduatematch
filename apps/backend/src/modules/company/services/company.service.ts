import { Injectable, BadRequestException } from '@nestjs/common';
import { CompanyRepository } from '../repositories/company.repository';
import { Company } from '../domain/company.entity';

/**
 * CompanyService - Business logic for Company operations
 */
@Injectable()
export class CompanyService {
  constructor(private readonly companyRepository: CompanyRepository) {}

  /**
   * Get company profile
   */
  async getProfile(companyId: string): Promise<Company | null> {
    if (!companyId) throw new BadRequestException('Company ID is required');
    return this.companyRepository.findById(companyId);
  }

  /**
   * Get company by user ID
   */
  async getByUserId(userId: string): Promise<Company | null> {
    if (!userId) throw new BadRequestException('User ID is required');
    return this.companyRepository.findByUserId(userId);
  }

  /**
   * Update company profile
   */
  async updateProfile(companyId: string, data: Partial<Company>): Promise<Company | null> {
    if (!companyId) throw new BadRequestException('Company ID is required');
    return this.companyRepository.update(companyId, data);
  }

  /**
   * Get all companies
   */
  async getAllCompanies(): Promise<Company[]> {
    return this.companyRepository.findAll();
  }
}
