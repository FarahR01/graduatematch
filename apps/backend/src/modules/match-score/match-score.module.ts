import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchScore } from './domain/match-score.entity';
import { MatchScoreRepository } from './repositories/match-score.repository';
import { MatchScoreService } from './services/match-score.service';
import { MatchScoreController } from './controllers/match-score.controller';

/**
 * MatchScoreModule - Feature module for MatchScore management
 */
@Module({
  imports: [TypeOrmModule.forFeature([MatchScore])],
  providers: [MatchScoreRepository, MatchScoreService],
  controllers: [MatchScoreController],
  exports: [MatchScoreService],
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class MatchScoreModule {}
