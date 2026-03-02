import { Column, Entity, ManyToOne, JoinColumn, Index, Unique } from 'typeorm';
import { AppBaseEntity } from '../../../common/entities/base.entity';
import { Job } from '../../job/domain/job.entity';
import { Graduate } from '../../graduate/domain/graduate.entity';

export enum ApplicationStatus {
  SUBMITTED = 'submitted',
  REVIEWING = 'reviewing',
  INTERVIEW = 'interview',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}

/**
 * Application Entity - Tracks job applications from graduates
 * Unique constraint ensures one application per (job, graduate) pair
 * Indexed for efficient filtering by job and status
 */
@Entity('applications')
@Unique(['jobId', 'graduateId'])
@Index(['jobId', 'status'])
@Index(['graduateId'])
@Index(['appliedAt'])
export class Application extends AppBaseEntity {
  @Column({ type: 'uuid' })
  jobId!: string;

  @Column({ type: 'uuid' })
  graduateId!: string;

  @Column({
    type: 'enum',
    enum: ApplicationStatus,
    default: ApplicationStatus.SUBMITTED,
  })
  status!: ApplicationStatus;

  @Column({ type: 'text', nullable: true })
  coverLetter?: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  appliedAt!: Date;

  // Relations
  @ManyToOne(() => Job, (job: Job) => job.applications, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'jobId' })
  job!: Job;

  @ManyToOne(() => Graduate, (graduate: Graduate) => graduate.applications, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'graduateId' })
  graduate!: Graduate;
}
