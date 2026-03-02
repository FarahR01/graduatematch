import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';

/**
 * HealthModule - Health check endpoints for monitoring
 */
@Module({
  controllers: [HealthController],
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class HealthModule {}
