import 'dotenv/config';
import { DataSource } from 'typeorm';
import path from 'path';

export default new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [path.join(__dirname, 'src/modules/**/*.entity.ts')],
  migrations: [path.join(__dirname, 'src/database/migrations/*.ts')],
  migrationsTableName: 'migrations',
  synchronize: false,
  logging: false,
  maxQueryExecutionTime: 5000,
  extra: {
    max: Number(process.env.DB_POOL_MAX ?? 20),
    min: Number(process.env.DB_POOL_MIN ?? 5),
    idleTimeoutMillis: Number(process.env.DB_IDLE_TIMEOUT_MS ?? 30000),
    connectionTimeoutMillis: Number(process.env.DB_CONN_TIMEOUT_MS ?? 2000),
  },
});
