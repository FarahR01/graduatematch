import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from './domain/application.entity';
import { ApplicationRepository } from './repositories/application.repository';
import { ApplicationService } from './services/application.service';
import { ApplicationController } from './controllers/application.controller';

/**
 * ApplicationModule - Feature module for Application management
 */
@Module({
  imports: [TypeOrmModule.forFeature([Application])],
  providers: [ApplicationRepository, ApplicationService],
  controllers: [ApplicationController],
  exports: [ApplicationService],
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class ApplicationModule {}
