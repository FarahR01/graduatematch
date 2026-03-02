import { AppDataSource } from './data-source';

/**
 * TypeORM Connection Provider
 * Initializes and provides the database connection for NestJS
 * Handles connection errors gracefully
 */
export const TypeOrmProvider = {
  provide: 'DATA_SOURCE',
  async useFactory() {
    if (!AppDataSource.isInitialized) {
      return await AppDataSource.initialize();
    }
    return AppDataSource;
  },
};
