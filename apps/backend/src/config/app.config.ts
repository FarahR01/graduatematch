import { registerAs } from '@nestjs/config';

/**
 * Application configuration
 * Loaded via @nestjs/config and accessible via ConfigService
 */
export const appConfig = registerAs('app', () => ({
  name: 'GraduateMatch API',
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3001', 10),
  apiPrefix: 'api',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  rateLimitTtl: parseInt(process.env.RATE_LIMIT_TTL || '60', 10),
  rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
}));

export type AppConfig = ReturnType<typeof appConfig>;
