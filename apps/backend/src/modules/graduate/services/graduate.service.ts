import { Injectable, BadRequestException } from '@nestjs/common';
import { GraduateRepository } from '../repositories/graduate.repository';
import { Graduate } from '../domain/graduate.entity';

/**
 * GraduateService - Business logic for Graduate operations
 */
@Injectable()
export class GraduateService {
  constructor(private readonly graduateRepository: GraduateRepository) {}

  /**
   * Get graduate profile
   */
  async getProfile(graduateId: string): Promise<Graduate | null> {
    if (!graduateId) throw new BadRequestException('Graduate ID is required');
    return this.graduateRepository.findById(graduateId);
  }

  /**
   * Get graduate by user ID
   */
  async getByUserId(userId: string): Promise<Graduate | null> {
    if (!userId) throw new BadRequestException('User ID is required');
    return this.graduateRepository.findByUserId(userId);
  }

  /**
   * Update graduate profile
   */
  async updateProfile(graduateId: string, data: Partial<Graduate>): Promise<Graduate | null> {
    if (!graduateId) throw new BadRequestException('Graduate ID is required');
    return this.graduateRepository.update(graduateId, data);
  }

  /**
   * Find graduates by experience
   */
  async findExperienced(minYears: number): Promise<Graduate[]> {
    return this.graduateRepository.findExperienced(minYears);
  }
}
