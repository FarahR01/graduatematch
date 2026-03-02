import { Column, Entity, OneToMany, Index } from 'typeorm';
import { AppBaseEntity } from '../../../common/entities/base.entity';
import { GraduateBadge } from '../../graduate/domain/graduate-badge.entity';

/**
 * Badge Entity - Represents achievements/credentials that graduates can earn
 * Stores requirements/criteria as JSONB for flexibility
 * Memory efficient - stored once, referenced many times
 */
@Entity('badges')
@Index(['code'])
export class Badge extends AppBaseEntity {
  @Column({ type: 'varchar', length: 100, unique: true })
  code!: string;

  @Column({ type: 'varchar', length: 150 })
  name!: string;

  @Column({ type: 'jsonb', default: '{}' })
  criteria!: Record<string, unknown>;

  // Relations
  @OneToMany(() => GraduateBadge, (badge) => badge.badge, {
    onDelete: 'CASCADE',
  })
  graduateBadges!: GraduateBadge[];
}
