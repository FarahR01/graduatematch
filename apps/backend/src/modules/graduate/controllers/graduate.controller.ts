import { Controller, Get, Put, Param, Body, BadRequestException } from '@nestjs/common';
import { GraduateService } from '../services/graduate.service';
import { Graduate } from '../domain/graduate.entity';

/**
 * GraduateController - REST API endpoints for Graduate management
 */
@Controller('graduates')
export class GraduateController {
  constructor(private readonly graduateService: GraduateService) {}

  @Get(':id')
  async getProfile(@Param('id') id: string): Promise<Graduate | null> {
    if (!id) throw new BadRequestException('Graduate ID is required');
    return this.graduateService.getProfile(id);
  }

  @Put(':id')
  async updateProfile(
    @Param('id') id: string,
    @Body() body: Partial<Graduate>
  ): Promise<Graduate | null> {
    if (!id) throw new BadRequestException('Graduate ID is required');
    return this.graduateService.updateProfile(id, body);
  }

  @Get('experience/filter')
  async getExperienced(@Param('minYears') minYears: number): Promise<Graduate[]> {
    return this.graduateService.findExperienced(minYears);
  }
}
