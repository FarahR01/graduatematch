import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from '../domain/skill.entity';
import { BaseRepository } from '../../../common/repositories/base.repository';

/**
 * SkillRepository - Specialized repository for Skill entity
 * Memory optimized with slug-based lookups
 */
@Injectable()
export class SkillRepository extends BaseRepository<Skill> {
  constructor(@InjectRepository(Skill) private skillRepository: Repository<Skill>) {
    super(skillRepository);
  }

  /**
   * Find skill by slug
   */
  async findBySlug(slug: string): Promise<Skill | null> {
    return this.skillRepository.findOne({ where: { slug } });
  }

  /**
   * Get all skills (cached data)
   */
  async getAllSkills(): Promise<Skill[]> {
    return this.skillRepository.find({
      order: { label: 'ASC' },
    });
  }
}
