import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { MatchScoreService } from '../services/match-score.service';
import { MatchScore } from '../domain/match-score.entity';

/**
 * MatchScoreController - REST API endpoints for Match Score management
 */
@Controller('matches')
export class MatchScoreController {
  constructor(private readonly matchScoreService: MatchScoreService) {}

  @Get('job/:jobId')
  async getTopMatchesForJob(
    @Param('jobId') jobId: string,
    @Query('limit') limit?: string
  ): Promise<MatchScore[]> {
    if (!jobId) throw new BadRequestException('Job ID is required');
    const limitNum = limit ? parseInt(limit, 10) : 10;
    return this.matchScoreService.getTopMatchesForJob(jobId, limitNum);
  }

  @Get('graduate/:graduateId')
  async getTopJobsForGraduate(
    @Param('graduateId') graduateId: string,
    @Query('limit') limit?: string
  ): Promise<MatchScore[]> {
    if (!graduateId) throw new BadRequestException('Graduate ID is required');
    const limitNum = limit ? parseInt(limit, 10) : 10;
    return this.matchScoreService.getTopJobsForGraduate(graduateId, limitNum);
  }

  @Get('job/:jobId/graduate/:graduateId')
  async getScore(
    @Param('jobId') jobId: string,
    @Param('graduateId') graduateId: string
  ): Promise<MatchScore | null> {
    if (!jobId || !graduateId) {
      throw new BadRequestException('Job ID and Graduate ID are required');
    }
    return this.matchScoreService.getMatchScore(jobId, graduateId);
  }

  @Post()
  async saveScore(@Body() body: Partial<MatchScore>): Promise<MatchScore> {
    return this.matchScoreService.saveMatchScore(body);
  }

  @Put(':id')
  async updateScore(
    @Param('id') id: string,
    @Body() body: Partial<MatchScore>
  ): Promise<MatchScore | null> {
    if (!id) throw new BadRequestException('Score ID is required');
    return this.matchScoreService.updateMatchScore(id, body);
  }
}
