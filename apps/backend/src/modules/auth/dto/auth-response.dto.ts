import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@/modules/user/domain/user.entity';

/**
 * TokenPayload - JWT token payload structure
 */
export interface TokenPayload {
  sub: string;
  email: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}

/**
 * TokensResponseDto - Login/Register response with tokens
 */
export class TokensResponseDto {
  @ApiProperty({
    description: 'JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken!: string;

  @ApiProperty({
    description: 'JWT refresh token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  refreshToken!: string;

  @ApiProperty({
    description: 'Token expiration time in seconds',
    example: 604800,
  })
  expiresIn!: number;

  @ApiProperty({
    description: 'Token type',
    example: 'Bearer',
  })
  tokenType: string = 'Bearer';
}

/**
 * AuthResponseDto - Complete auth response with user info
 */
export class AuthResponseDto {
  @ApiProperty({ type: TokensResponseDto })
  tokens!: TokensResponseDto;

  @ApiProperty({
    description: 'User information',
    example: {
      id: '550e8400-e29b-41d4-a716-446655440000',
      email: 'john@example.com',
      role: 'graduate',
    },
  })
  user!: {
    id: string;
    email: string;
    role: UserRole;
  };
}
