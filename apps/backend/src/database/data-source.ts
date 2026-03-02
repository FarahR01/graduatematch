import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';

const isProduction = process.env.NODE_ENV === 'production';

const dataSourceConfig: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [
    isProduction ? 'dist/modules/**/*.entity.js' : 'src/modules/**/*.entity.ts',
  ],
  migrations: [isProduction ? 'dist/database/migrations/*.js' : 'src/database/migrations/*.ts'],
  synchronize: false,
  logging: !isProduction,
  maxQueryExecutionTime: 5000,
  extra: {
    max: Number(process.env.DB_POOL_MAX ?? 20),
    min: Number(process.env.DB_POOL_MIN ?? 5),
    idleTimeoutMillis: Number(process.env.DB_IDLE_TIMEOUT_MS ?? 30000),
    connectionTimeoutMillis: Number(process.env.DB_CONN_TIMEOUT_MS ?? 2000),
  },
};

export const AppDataSource = new DataSource(dataSourceConfig);
