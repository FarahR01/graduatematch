import { Injectable, BadRequestException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { User, UserRole } from '../domain/user.entity';

/**
 * UserService - Business logic for User operations
 * Handles user validation, authentication preparation, and data transformation
 * Implements clean separation from repository layer
 */
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * Get all active users
   */
  async getActiveUsers(): Promise<User[]> {
    return this.userRepository.findActive();
  }

  /**
   * Find user by ID
   */
  async findById(id: string): Promise<User | null> {
    if (!id) throw new BadRequestException('User ID is required');
    return this.userRepository.findById(id);
  }

  /**
   * Find user by email
   */
  async findByEmail(email: string): Promise<User | null> {
    if (!email) throw new BadRequestException('Email is required');
    return this.userRepository.findByEmail(email);
  }

  /**
   * Create new user
   */
  async createUser(data: {
    email: string;
    passwordHash: string;
    role: UserRole;
  }): Promise<User> {
    const exists = await this.userRepository.existsByEmail(data.email);
    if (exists) {
      throw new BadRequestException('Email already registered');
    }
    return this.userRepository.create(data);
  }

  /**
   * Activate/Deactivate user
   */
  async toggleUserStatus(id: string, isActive: boolean): Promise<User | null> {
    if (!id) throw new BadRequestException('User ID is required');
    return this.userRepository.update(id, { isActive });
  }

  /**
   * Delete user
   */
  async deleteUser(id: string): Promise<boolean> {
    if (!id) throw new BadRequestException('User ID is required');
    return this.userRepository.delete(id);
  }
}
