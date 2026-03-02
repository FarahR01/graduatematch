import { Column, Entity, OneToOne, JoinColumn, OneToMany, Index } from 'typeorm';
import { AppBaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../user/domain/user.entity';
import { Job } from '../../job/domain/job.entity';

/**
 * Company Entity - Profile-specific data for company users
 * Linked to User for authentication
 * Contains company information and job postings
 */
@Entity('companies')
@Index(['userId'])
export class Company extends AppBaseEntity {
  @Column({ type: 'uuid', unique: true })
  userId!: string;

  @Column({ type: 'varchar', length: 180 })
  name!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  website?: string;

  @Column({ type: 'int', nullable: true })
  size?: number;

  // Relations
  @OneToOne(() => User, (user) => user.company, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user!: User;

  @OneToMany(() => Job, (job) => job.company, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  jobs!: Job[];
}
