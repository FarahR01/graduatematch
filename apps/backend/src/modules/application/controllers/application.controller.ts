import { Controller, Get, Post, Put, Param, Body, BadRequestException } from '@nestjs/common';
import { ApplicationService } from '../services/application.service';
import { Application } from '../domain/application.entity';

/**
 * ApplicationController - REST API endpoints for Application management
 */
@Controller('applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Get(':id')
  async getApplication(@Param('id') id: string): Promise<Application | null> {
    if (!id) throw new BadRequestException('Application ID is required');
    return this.applicationService.getApplicationDetails(id);
  }

  @Get('job/:jobId')
  async getForJob(@Param('jobId') jobId: string): Promise<Application[]> {
    if (!jobId) throw new BadRequestException('Job ID is required');
    return this.applicationService.getApplicationsForJob(jobId);
  }

  @Get('graduate/:graduateId')
  async getFromGraduate(@Param('graduateId') graduateId: string): Promise<Application[]> {
    if (!graduateId) throw new BadRequestException('Graduate ID is required');
    return this.applicationService.getApplicationsFromGraduate(graduateId);
  }

  @Post()
  async submitApplication(@Body() body: Partial<Application>): Promise<Application> {
    return this.applicationService.submitApplication(body);
  }

  @Put(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() body: { status: string },
  ): Promise<Application | null> {
    if (!id) throw new BadRequestException('Application ID is required');
    return this.applicationService.updateStatus(id, body.status);
  }
}
