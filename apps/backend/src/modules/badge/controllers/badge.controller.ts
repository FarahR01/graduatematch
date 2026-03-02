import { Controller, Get, Post, Param, Body, BadRequestException } from '@nestjs/common';
import { BadgeService } from '../services/badge.service';
import { Badge } from '../domain/badge.entity';

/**
 * BadgeController - REST API endpoints for Badge management
 */
@Controller('badges')
export class BadgeController {
  constructor(private readonly badgeService: BadgeService) {}

  @Get()
  async getAll(): Promise<Badge[]> {
    return this.badgeService.getAllBadges();
  }

  @Get(':id')
  async getBadge(@Param('id') id: string): Promise<Badge | null> {
    if (!id) throw new BadRequestException('Badge ID is required');
    return this.badgeService.getBadgeById(id);
  }

  @Get('code/:code')
  async getByCode(@Param('code') code: string): Promise<Badge | null> {
    if (!code) throw new BadRequestException('Code is required');
    return this.badgeService.getBadgeByCode(code);
  }

  @Post()
  async createBadge(@Body() body: Partial<Badge>): Promise<Badge> {
    return this.badgeService.createBadge(body);
  }
}
