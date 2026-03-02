import { registerAs } from '@nestjs/config';

/**
 * JWT configuration
 * Configures access and refresh token settings
 */
export const jwtConfig = registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET || 'change-me-in-production',
  expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  refreshSecret:
    (process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET || 'change-me-in-production') +
    '-refresh',
  refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
}));

export type JwtConfig = ReturnType<typeof jwtConfig>;
