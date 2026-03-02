import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Badge } from './domain/badge.entity';
import { BadgeRepository } from './repositories/badge.repository';
import { BadgeService } from './services/badge.service';
import { BadgeController } from './controllers/badge.controller';

/**
 * BadgeModule - Feature module for Badge management
 */
@Module({
  imports: [TypeOrmModule.forFeature([Badge])],
  providers: [BadgeRepository, BadgeService],
  controllers: [BadgeController],
  exports: [BadgeService],
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class BadgeModule {}
