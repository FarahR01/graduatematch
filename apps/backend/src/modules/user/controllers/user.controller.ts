import { Controller, Get, Post, Put, Delete, Param, Body, BadRequestException } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User, UserRole } from '../domain/user.entity';

/**
 * UserController - REST API endpoints for User management
 * Handles HTTP requests and delegates to service layer
 */
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.getActiveUsers();
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User | null> {
    if (!id) throw new BadRequestException('User ID is required');
    return this.userService.findById(id);
  }

  @Post()
  async createUser(
    @Body()
    body: {
      email: string;
      passwordHash: string;
      role?: string;
    },
  ): Promise<User> {
    const role = (body.role || 'graduate') as unknown as UserRole;
    return this.userService.createUser({ ...body, role });
  }

  @Put(':id/status')
  async toggleUserStatus(
    @Param('id') id: string,
    @Body() body: { isActive: boolean },
  ): Promise<User | null> {
    if (!id) throw new BadRequestException('User ID is required');
    return this.userService.toggleUserStatus(id, body.isActive);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<{ success: boolean }> {
    if (!id) throw new BadRequestException('User ID is required');
    const success = await this.userService.deleteUser(id);
    return { success };
  }
}
