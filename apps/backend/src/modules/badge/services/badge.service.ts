import { Injectable, BadRequestException } from '@nestjs/common';
import { BadgeRepository } from '../repositories/badge.repository';
import { Badge } from '../domain/badge.entity';

/**
 * BadgeService - Business logic for Badge operations
 */
@Injectable()
export class BadgeService {
  constructor(private readonly badgeRepository: BadgeRepository) {}

  /**
   * Get all badges
   */
  async getAllBadges(): Promise<Badge[]> {
    return this.badgeRepository.getAllBadges();
  }

  /**
   * Get badge by ID
   */
  async getBadgeById(id: string): Promise<Badge | null> {
    if (!id) throw new BadRequestException('Badge ID is required');
    return this.badgeRepository.findById(id);
  }

  /**
   * Get badge by code
   */
  async getBadgeByCode(code: string): Promise<Badge | null> {
    if (!code) throw new BadRequestException('Badge code is required');
    return this.badgeRepository.findByCode(code);
  }

  /**
   * Create badge
   */
  async createBadge(data: Partial<Badge>): Promise<Badge> {
    return this.badgeRepository.create(data);
  }
}
