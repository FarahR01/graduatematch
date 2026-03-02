import { Column, Entity, ManyToOne, JoinColumn, Index, PrimaryColumn } from 'typeorm';
import { Job } from '../../job/domain/job.entity';
import { Skill } from '../../skill/domain/skill.entity';

/**
 * JobSkill Entity - Join table with metadata
 * Represents many-to-many relationship between jobs and required skills
 * Weight field stores importance/priority of skill for the job
 * Composite primary key for memory efficiency
 */
@Entity('job_skills')
@Index(['jobId'])
@Index(['skillId'])
export class JobSkill {
  @PrimaryColumn({ type: 'uuid', name: 'job_id' })
  jobId!: string;

  @PrimaryColumn({ type: 'uuid', name: 'skill_id' })
  skillId!: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 1.0 })
  weight!: number;

  // Relations
  @ManyToOne(() => Job, (job) => job.skills, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'job_id' })
  job!: Job;

  @ManyToOne(() => Skill, (skill) => skill.jobSkills, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'skill_id' })
  skill!: Skill;
}
