import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skill } from './domain/skill.entity';
import { SkillRepository } from './repositories/skill.repository';
import { SkillService } from './services/skill.service';
import { SkillController } from './controllers/skill.controller';

/**
 * SkillModule - Feature module for Skill management
 */
@Module({
  imports: [TypeOrmModule.forFeature([Skill])],
  providers: [SkillRepository, SkillService],
  controllers: [SkillController],
  exports: [SkillService],
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class SkillModule {}
