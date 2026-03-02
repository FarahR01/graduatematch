import { Column, Entity, ManyToOne, JoinColumn, Index, PrimaryColumn } from 'typeorm';
import { Graduate } from '../../graduate/domain/graduate.entity';
import { Skill } from '../../skill/domain/skill.entity';

/**
 * GraduateSkill Entity - Join table with metadata
 * Represents many-to-many relationship between graduates and skills
 * Level field allows storing proficiency level (1-5 scale)
 * Composite primary key for memory efficiency
 */
@Entity('graduate_skills')
@Index(['graduateId'])
@Index(['skillId'])
export class GraduateSkill {
  @PrimaryColumn({ type: 'uuid', name: 'graduate_id' })
  graduateId!: string;

  @PrimaryColumn({ type: 'uuid', name: 'skill_id' })
  skillId!: string;

  @Column({ type: 'smallint', default: 1 })
  level!: number;

  // Relations
  @ManyToOne(() => Graduate, (graduate) => graduate.skills, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'graduate_id' })
  graduate!: Graduate;

  @ManyToOne(() => Skill, (skill) => skill.graduateSkills, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'skill_id' })
  skill!: Skill;
}
