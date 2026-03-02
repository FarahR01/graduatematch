import { Controller, Get, Post, Param, Body, BadRequestException } from '@nestjs/common';
import { SkillService } from '../services/skill.service';
import { Skill } from '../domain/skill.entity';

/**
 * SkillController - REST API endpoints for Skill management
 */
@Controller('skills')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Get()
  async getAll(): Promise<Skill[]> {
    return this.skillService.getAllSkills();
  }

  @Get(':id')
  async getSkill(@Param('id') id: string): Promise<Skill | null> {
    if (!id) throw new BadRequestException('Skill ID is required');
    return this.skillService.getSkillById(id);
  }

  @Get('slug/:slug')
  async getBySlug(@Param('slug') slug: string): Promise<Skill | null> {
    if (!slug) throw new BadRequestException('Slug is required');
    return this.skillService.getSkillBySlug(slug);
  }

  @Post()
  async createSkill(@Body() body: Partial<Skill>): Promise<Skill> {
    return this.skillService.createSkill(body);
  }
}
