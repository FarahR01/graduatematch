export { appConfig, type AppConfig } from './app.config';
export { databaseConfig, type DatabaseConfig } from './database.config';
export { jwtConfig, type JwtConfig } from './jwt.config';
export { validate, EnvironmentVariables, Environment } from './env.validation';

/**
 * All configuration modules for loading
 */
export const configurations = [
  async (): Promise<unknown> => (await import('./app.config')).appConfig,
  async (): Promise<unknown> => (await import('./database.config')).databaseConfig,
  async (): Promise<unknown> => (await import('./jwt.config')).jwtConfig,
];
