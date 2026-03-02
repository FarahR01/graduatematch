import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Graduate, GraduateSkill, GraduateBadge } from './domain';
import { GraduateRepository } from './repositories/graduate.repository';
import { GraduateService } from './services/graduate.service';
import { GraduateController } from './controllers/graduate.controller';

/**
 * GraduateModule - Feature module for Graduate management
 */
@Module({
  imports: [TypeOrmModule.forFeature([Graduate, GraduateSkill, GraduateBadge])],
  providers: [GraduateRepository, GraduateService],
  controllers: [GraduateController],
  exports: [GraduateService],
})
export class GraduateModule {}
