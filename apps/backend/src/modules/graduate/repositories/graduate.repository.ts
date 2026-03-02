import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Graduate } from '../domain/graduate.entity';
import { BaseRepository } from '../../../common/repositories/base.repository';

/**
 * GraduateRepository - Specialized repository for Graduate entity
 * Query optimization for graduate profile retrieval
 */
@Injectable()
export class GraduateRepository extends BaseRepository<Graduate> {
  constructor(@InjectRepository(Graduate) private graduateRepository: Repository<Graduate>) {
    super(graduateRepository);
  }

  /**
   * Find graduate by userId with relations
   */
  async findByUserId(userId: string): Promise<Graduate | null> {
    return this.graduateRepository.findOne({
      where: { userId },
      relations: ['skills', 'badges'],
    });
  }

  /**
   * Find graduates with experience
   */
  async findExperienced(minYears: number): Promise<Graduate[]> {
    return this.createQueryBuilder()
      .where('experienceYears >= :minYears', { minYears })
      .orderBy('experienceYears', 'DESC')
      .getMany();
  }

  /**
   * Count graduates by experience level
   */
  async countByExperience(minYears: number): Promise<number> {
    return this.createQueryBuilder().where('experienceYears >= :minYears', { minYears }).getCount();
  }
}
