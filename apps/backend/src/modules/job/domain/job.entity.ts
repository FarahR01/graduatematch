import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { AppBaseEntity } from '../../../common/entities/base.entity';
import { Company } from '../../company/domain/company.entity';
import { Application } from '../../application/domain/application.entity';
import { JobSkill } from './job-skill.entity';
import { MatchScore } from '../../match-score/domain/match-score.entity';

export enum JobStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  CLOSED = 'closed',
}

/**
 * Job Entity - Represents job postings from companies
 * Indexed by company and status for efficient filtering
 * Maintains application history and match scores
 */
@Entity('jobs')
@Index(['companyId', 'status'])
@Index(['createdAt'])
@Index(['status'])
export class Job extends AppBaseEntity {
  @Column({ type: 'uuid' })
  companyId!: string;

  @Column({ type: 'varchar', length: 180 })
  title!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  location?: string;

  @Column({
    type: 'enum',
    enum: JobStatus,
    default: JobStatus.DRAFT,
  })
  status!: JobStatus;

  @Column({ type: 'timestamptz', nullable: true })
  publishedAt?: Date;

  // Relations
  @ManyToOne(() => Company, (company) => company.jobs, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'companyId' })
  company!: Company;

  @OneToMany(() => Application, (app) => app.job, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  applications!: Application[];

  @OneToMany(() => JobSkill, (skill) => skill.job, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  skills!: JobSkill[];

  @OneToMany(() => MatchScore, (score) => score.job, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  matchScores!: MatchScore[];
}
