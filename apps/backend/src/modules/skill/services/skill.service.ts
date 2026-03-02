import { Injectable, BadRequestException } from '@nestjs/common';
import { SkillRepository } from '../repositories/skill.repository';
import { Skill } from '../domain/skill.entity';

/**
 * SkillService - Business logic for Skill operations
 */
@Injectable()
export class SkillService {
  constructor(private readonly skillRepository: SkillRepository) {}

  /**
   * Get all skills
   */
  async getAllSkills(): Promise<Skill[]> {
    return this.skillRepository.getAllSkills();
  }

  /**
   * Get skill by ID
   */
  async getSkillById(id: string): Promise<Skill | null> {
    if (!id) throw new BadRequestException('Skill ID is required');
    return this.skillRepository.findById(id);
  }

  /**
   * Get skill by slug
   */
  async getSkillBySlug(slug: string): Promise<Skill | null> {
    if (!slug) throw new BadRequestException('Skill slug is required');
    return this.skillRepository.findBySlug(slug);
  }

  /**
   * Create skill
   */
  async createSkill(data: Partial<Skill>): Promise<Skill> {
    return this.skillRepository.create(data);
  }
}
