import { plainToInstance, Type } from 'class-transformer';
import { IsString, IsNumber, IsOptional, IsEnum, Min, Max, validateSync } from 'class-validator';

export enum Environment {
  Development = 'development',
  Staging = 'staging',
  Production = 'production',
  Test = 'test',
}

/**
 * EnvironmentVariables - Validates and types all environment variables
 * Ensures type safety and required env vars at startup
 */
export class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment = Environment.Development;

  @IsNumber()
  @Min(1)
  @Max(65535)
  @Type(() => Number)
  PORT: number = 3001;

  @IsString()
  DATABASE_URL!: string;

  @IsNumber()
  @Min(1)
  @Max(100)
  @IsOptional()
  @Type(() => Number)
  DB_POOL_MAX: number = 20;

  @IsNumber()
  @Min(0)
  @Max(50)
  @IsOptional()
  @Type(() => Number)
  DB_POOL_MIN: number = 5;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  DB_IDLE_TIMEOUT_MS: number = 30000;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  DB_CONN_TIMEOUT_MS: number = 2000;

  @IsString()
  JWT_SECRET!: string;

  @IsString()
  @IsOptional()
  JWT_EXPIRES_IN: string = '7d';

  @IsString()
  @IsOptional()
  JWT_REFRESH_SECRET?: string;

  @IsString()
  @IsOptional()
  JWT_REFRESH_EXPIRES_IN: string = '30d';

  @IsString()
  @IsOptional()
  CORS_ORIGIN: string = 'http://localhost:3000';

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  RATE_LIMIT_TTL: number = 60;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  RATE_LIMIT_MAX: number = 100;
}

/**
 * Validates environment variables at application startup
 * Throws if required vars are missing or invalid
 */
export function validate(config: Record<string, unknown>): EnvironmentVariables {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    const errorMessages = errors
      .map((error) => Object.values(error.constraints || {}).join(', '))
      .join('; ');
    throw new Error(`Environment validation failed: ${errorMessages}`);
  }

  return validatedConfig;
}
