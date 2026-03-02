import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MatchScore } from '../domain/match-score.entity';
import { BaseRepository } from '../../../common/repositories/base.repository';

/**
 * MatchScoreRepository - Specialized repository for MatchScore entity
 * Optimized for ranking and filtering matches
 */
@Injectable()
export class MatchScoreRepository extends BaseRepository<MatchScore> {
  constructor(
    @InjectRepository(MatchScore)
    private matchScoreRepository: Repository<MatchScore>
  ) {
    super(matchScoreRepository);
  }

  /**
   * Find top matches for a job
   */
  async findTopMatchesForJob(jobId: string, limit: number = 10): Promise<MatchScore[]> {
    return this.createQueryBuilder('match')
      .where('match.jobId = :jobId', { jobId })
      .orderBy('match.score', 'DESC')
      .take(limit)
      .leftJoinAndSelect('match.graduate', 'graduate')
      .getMany();
  }

  /**
   * Find top jobs for a graduate
   */
  async findTopJobsForGraduate(graduateId: string, limit: number = 10): Promise<MatchScore[]> {
    return this.createQueryBuilder('match')
      .where('match.graduateId = :graduateId', { graduateId })
      .orderBy('match.score', 'DESC')
      .take(limit)
      .leftJoinAndSelect('match.job', 'job')
      .getMany();
  }

  /**
   * Find match score for specific job and graduate
   */
  async findScore(jobId: string, graduateId: string): Promise<MatchScore | null> {
    return this.matchScoreRepository.findOne({
      where: { jobId, graduateId },
    });
  }
}
