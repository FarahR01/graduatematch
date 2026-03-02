import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';

/**
 * HealthModule - Health check endpoints for monitoring
 */
@Module({
  controllers: [HealthController],
})
export class HealthModule {}
