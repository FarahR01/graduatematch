import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './domain/company.entity';
import { CompanyRepository } from './repositories/company.repository';
import { CompanyService } from './services/company.service';
import { CompanyController } from './controllers/company.controller';

/**
 * CompanyModule - Feature module for Company management
 */
@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  providers: [CompanyRepository, CompanyService],
  controllers: [CompanyController],
  exports: [CompanyService],
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class CompanyModule {}
