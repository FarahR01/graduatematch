import { Injectable, BadRequestException } from '@nestjs/common';
import { MatchScoreRepository } from '../repositories/match-score.repository';
import { MatchScore } from '../domain/match-score.entity';

/**
 * MatchScoreService - Business logic for MatchScore operations
 * Handles match score calculations and retrievals
 */
@Injectable()
export class MatchScoreService {
  constructor(private readonly matchScoreRepository: MatchScoreRepository) {}

  /**
   * Get top matches for a job
   */
  async getTopMatchesForJob(jobId: string, limit: number = 10): Promise<MatchScore[]> {
    if (!jobId) throw new BadRequestException('Job ID is required');
    return this.matchScoreRepository.findTopMatchesForJob(jobId, limit);
  }

  /**
   * Get top jobs for a graduate
   */
  async getTopJobsForGraduate(
    graduateId: string,
    limit: number = 10,
  ): Promise<MatchScore[]> {
    if (!graduateId) throw new BadRequestException('Graduate ID is required');
    return this.matchScoreRepository.findTopJobsForGraduate(graduateId, limit);
  }

  /**
   * Get score for specific job and graduate
   */
  async getMatchScore(jobId: string, graduateId: string): Promise<MatchScore | null> {
    if (!jobId || !graduateId) {
      throw new BadRequestException('Job ID and Graduate ID are required');
    }
    return this.matchScoreRepository.findScore(jobId, graduateId);
  }

  /**
   * Calculate and save match score
   */
  async saveMatchScore(data: Partial<MatchScore>): Promise<MatchScore> {
    return this.matchScoreRepository.create(data);
  }

  /**
   * Update match score
   */
  async updateMatchScore(
    scoreId: string,
    data: Partial<MatchScore>,
  ): Promise<MatchScore | null> {
    if (!scoreId) throw new BadRequestException('Score ID is required');
    return this.matchScoreRepository.update(scoreId, data);
  }
}
