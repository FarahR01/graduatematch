import { Column, Entity, OneToMany, Index } from 'typeorm';
import { AppBaseEntity } from '../../../common/entities/base.entity';
import { GraduateSkill } from '../../graduate/domain/graduate-skill.entity';
import { JobSkill } from '../../job/domain/job-skill.entity';

/**
 * Skill Entity - Represents technical or professional skills
 * Immutable catalog shared across the platform
 * Memory optimized with slug-based identification
 */
@Entity('skills')
@Index(['slug'])
export class Skill extends AppBaseEntity {
  @Column({ type: 'varchar', length: 120, unique: true })
  slug!: string;

  @Column({ type: 'varchar', length: 120 })
  label!: string;

  // Relations
  @OneToMany(() => GraduateSkill, (skill) => skill.skill, {
    onDelete: 'CASCADE',
  })
  graduateSkills!: GraduateSkill[];

  @OneToMany(() => JobSkill, (skill) => skill.skill, {
    onDelete: 'CASCADE',
  })
  jobSkills!: JobSkill[];
}
