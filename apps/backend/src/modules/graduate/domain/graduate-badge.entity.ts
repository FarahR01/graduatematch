import { Column, Entity, ManyToOne, JoinColumn, Index, PrimaryColumn } from 'typeorm';
import { Graduate } from '../../graduate/domain/graduate.entity';
import { Badge } from '../../badge/domain/badge.entity';

/**
 * GraduateBadge Entity - Join table with timestamp
 * Represents many-to-many relationship between graduates and badges
 * Records when badge was awarded for audit/history purposes
 * Composite primary key for memory efficiency
 */
@Entity('graduate_badges')
@Index(['graduateId'])
@Index(['badgeId'])
export class GraduateBadge {
  @PrimaryColumn({ type: 'uuid', name: 'graduate_id' })
  graduateId!: string;

  @PrimaryColumn({ type: 'uuid', name: 'badge_id' })
  badgeId!: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  awardedAt!: Date;

  // Relations
  @ManyToOne(() => Graduate, (graduate) => graduate.badges, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'graduate_id' })
  graduate!: Graduate;

  @ManyToOne(() => Badge, (badge) => badge.graduateBadges, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'badge_id' })
  badge!: Badge;
}
