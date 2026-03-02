import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Badge } from '../domain/badge.entity';
import { BaseRepository } from '../../../common/repositories/base.repository';

/**
 * BadgeRepository - Specialized repository for Badge entity
 */
@Injectable()
export class BadgeRepository extends BaseRepository<Badge> {
  constructor(
    @InjectRepository(Badge) private badgeRepository: Repository<Badge>,
  ) {
    super(badgeRepository);
  }

  /**
   * Find badge by code
   */
  async findByCode(code: string): Promise<Badge | null> {
    return this.badgeRepository.findOne({ where: { code } });
  }

  /**
   * Get all badges
   */
  async getAllBadges(): Promise<Badge[]> {
    return this.badgeRepository.find({
      order: { name: 'ASC' },
    });
  }
}
