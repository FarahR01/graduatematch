import { Column, Entity, OneToOne, JoinColumn, OneToMany, Index } from 'typeorm';
import { AppBaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../user/domain/user.entity';
import { GraduateSkill } from './graduate-skill.entity';
import { GraduateBadge } from './graduate-badge.entity';
import { Application } from '../../application/domain/application.entity';
import { MatchScore } from '../../match-score/domain/match-score.entity';

/**
 * Graduate Entity - Profile-specific data for graduate users
 * Linked to User for authentication
 * Contains professional information, skills, and achievements
 */
@Entity('graduates')
@Index(['userId'])
export class Graduate extends AppBaseEntity {
  @Column({ type: 'uuid', unique: true })
  userId!: string;

  @Column({ type: 'varchar', length: 120 })
  firstName!: string;

  @Column({ type: 'varchar', length: 120 })
  lastName!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  headline?: string;

  @Column({ type: 'int', default: 0 })
  experienceYears!: number;

  // Relations
  @OneToOne(() => User, (user) => user.graduate, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user!: User;

  @OneToMany(() => GraduateSkill, (skill) => skill.graduate, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  skills!: GraduateSkill[];

  @OneToMany(() => GraduateBadge, (badge) => badge.graduate, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  badges!: GraduateBadge[];

  @OneToMany(() => Application, (app) => app.graduate, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  applications!: Application[];

  @OneToMany(() => MatchScore, (score) => score.graduate, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  matchScores!: MatchScore[];
}
