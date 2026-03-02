import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsEnum,
  IsOptional,
  Matches,
} from 'class-validator';
import { UserRole } from '@/modules/user/domain/user.entity';

/**
 * RegisterDto - User registration input
 */
export class RegisterDto {
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'User email address',
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @MaxLength(255)
  email!: string;

  @ApiProperty({
    example: 'SecurePass123!',
    description: 'Password (min 8 chars, 1 uppercase, 1 number)',
    minLength: 8,
  })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @MaxLength(128)
  @Matches(/^(?=.*[A-Z])(?=.*\d)/, {
    message: 'Password must contain at least 1 uppercase letter and 1 number',
  })
  password!: string;

  @ApiPropertyOptional({
    enum: UserRole,
    default: UserRole.GRADUATE,
    description: 'User role type',
  })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole = UserRole.GRADUATE;

  @ApiPropertyOptional({
    example: 'John',
    description: 'First name (for graduates)',
  })
  @IsString()
  @MaxLength(100)
  @IsOptional()
  firstName?: string;

  @ApiPropertyOptional({
    example: 'Doe',
    description: 'Last name (for graduates)',
  })
  @IsString()
  @MaxLength(100)
  @IsOptional()
  lastName?: string;

  @ApiPropertyOptional({
    example: 'Acme Corp',
    description: 'Company name (for companies)',
  })
  @IsString()
  @MaxLength(255)
  @IsOptional()
  companyName?: string;
}

/**
 * LoginDto - User login input
 */
export class LoginDto {
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'User email address',
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email!: string;

  @ApiProperty({
    example: 'SecurePass123!',
    description: 'User password',
  })
  @IsString()
  @MinLength(1, { message: 'Password is required' })
  password!: string;
}

/**
 * RefreshTokenDto - Token refresh input
 */
export class RefreshTokenDto {
  @ApiProperty({
    description: 'Refresh token from previous login',
  })
  @IsString()
  refreshToken!: string;
}
