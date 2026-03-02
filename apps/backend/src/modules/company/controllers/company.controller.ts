import { Controller, Get, Put, Param, Body, BadRequestException } from '@nestjs/common';
import { CompanyService } from '../services/company.service';
import { Company } from '../domain/company.entity';

/**
 * CompanyController - REST API endpoints for Company management
 */
@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  async getAll(): Promise<Company[]> {
    return this.companyService.getAllCompanies();
  }

  @Get(':id')
  async getProfile(@Param('id') id: string): Promise<Company | null> {
    if (!id) throw new BadRequestException('Company ID is required');
    return this.companyService.getProfile(id);
  }

  @Put(':id')
  async updateProfile(
    @Param('id') id: string,
    @Body() body: Partial<Company>
  ): Promise<Company | null> {
    if (!id) throw new BadRequestException('Company ID is required');
    return this.companyService.updateProfile(id, body);
  }
}
