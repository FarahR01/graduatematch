import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { JobService } from '../services/job.service';
import { Job } from '../domain/job.entity';

/**
 * JobController - REST API endpoints for Job management
 */
@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get()
  async getPublishedJobs(): Promise<Job[]> {
    return this.jobService.getPublishedJobs();
  }

  @Get('active')
  async getActive(): Promise<Job[]> {
    return this.jobService.getActiveJobs();
  }

  @Get(':id')
  async getJob(@Param('id') id: string): Promise<Job | null> {
    if (!id) throw new BadRequestException('Job ID is required');
    return this.jobService.getJobDetails(id);
  }

  @Get('company/:companyId')
  async getByCompany(@Param('companyId') companyId: string): Promise<Job[]> {
    if (!companyId) throw new BadRequestException('Company ID is required');
    return this.jobService.getJobsByCompany(companyId);
  }

  @Post()
  async createJob(@Body() body: Partial<Job>): Promise<Job> {
    return this.jobService.createJob(body);
  }

  @Put(':id')
  async updateJob(@Param('id') id: string, @Body() body: Partial<Job>): Promise<Job | null> {
    if (!id) throw new BadRequestException('Job ID is required');
    return this.jobService.updateJob(id, body);
  }

  @Delete(':id')
  async deleteJob(@Param('id') id: string): Promise<{ success: boolean }> {
    if (!id) throw new BadRequestException('Job ID is required');
    const success = await this.jobService.deleteJob(id);
    return { success };
  }
}
