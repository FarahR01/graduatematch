import { Column, Entity, ManyToOne, JoinColumn, Index, Unique } from 'typeorm';
import { AppBaseEntity } from '../../../common/entities/base.entity';
import { Job } from '../../job/domain/job.entity';
import { Graduate } from '../../graduate/domain/graduate.entity';

/**
 * MatchScore Entity - Stores calculated match scores between jobs and graduates
 * JSONB breakdown allows flexible scoring criteria storage
 * Unique constraint prevents duplicate scores
 * Indexed for efficient retrieval and sorting
 */
@Entity('match_scores')
@Unique(['jobId', 'graduateId'])
@Index(['jobId', 'score'])
@Index(['graduateId'])
@Index(['calculatedAt'])
export class MatchScore extends AppBaseEntity {
  @Column({ type: 'uuid' })
  jobId!: string;

  @Column({ type: 'uuid' })
  graduateId!: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  score!: number;

  @Column({ type: 'jsonb', default: '{}' })
  breakdown!: Record<string, any>;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  calculatedAt!: Date;

  // Relations
  @ManyToOne(() => Job, (job) => job.matchScores, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'jobId' })
  job!: Job;

  @ManyToOne(() => Graduate, (graduate) => graduate.matchScores, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'graduateId' })
  graduate!: Graduate;
}
