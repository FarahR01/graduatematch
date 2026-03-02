import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../domain/user.entity';
import { BaseRepository } from '../../../common/repositories/base.repository';

/**
 * UserRepository - Specialized repository for User entity
 * Extends BaseRepository with user-specific queries
 */
@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {
    super(userRepository);
  }

  /**
   * Find user by email
   */
  async findByEmail(email: string): Promise<User | null> {
    return this.findOne({ email });
  }

  /**
   * Check if user exists by email
   */
  async existsByEmail(email: string): Promise<boolean> {
    return this.exists({ email });
  }

  /**
   * Find active users
   */
  async findActive(): Promise<User[]> {
    return this.findAll({ where: { isActive: true } });
  }
}
