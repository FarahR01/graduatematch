import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/user.entity';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';

/**
 * UserModule - Feature module for User management
 * Encapsulates user-related functionality
 */
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserRepository, UserService],
  controllers: [UserController],
  exports: [UserService],
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class UserModule {}
