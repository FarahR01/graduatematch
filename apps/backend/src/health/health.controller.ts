import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Public } from '@/common';

/**
 * Health check response interface
 */
export interface HealthCheckResponse {
  status: 'ok' | 'error';
  timestamp: string;
  uptime: number;
  environment: string;
  version: string;
}

/**
 * HealthController - Health check endpoints for monitoring
 * Provides liveness and readiness probes for Kubernetes/Docker
 */
@ApiTags('Health')
@Controller('health')
export class HealthController {
  private readonly startTime = Date.now();

  @Get()
  @Public()
  @ApiOperation({ summary: 'Liveness probe - Basic health check' })
  @ApiResponse({
    status: 200,
    description: 'Service is healthy',
  })
  healthCheck(): HealthCheckResponse {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: Math.floor((Date.now() - this.startTime) / 1000),
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '1.0.0',
    };
  }

  @Get('ready')
  @Public()
  @ApiOperation({ summary: 'Readiness probe - Full service check' })
  @ApiResponse({
    status: 200,
    description: 'Service is ready to accept traffic',
  })
  @ApiResponse({
    status: 503,
    description: 'Service is not ready',
  })
  readinessCheck(): {
    status: 'ok' | 'error';
    checks: Record<string, boolean>;
    timestamp: string;
  } {
    // Add more health checks here (database, redis, etc.)
    const checks = {
      database: this.checkDatabase(),
    };

    const allHealthy = Object.values(checks).every(Boolean);

    return {
      status: allHealthy ? 'ok' : 'error',
      checks,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('live')
  @Public()
  @ApiOperation({ summary: 'Kubernetes liveness probe' })
  @ApiResponse({ status: 200, description: 'Service is alive' })
  liveness(): { status: string } {
    return { status: 'ok' };
  }

  /**
   * Check database connectivity
   */
  private checkDatabase(): boolean {
    // In real implementation, run a simple query
    // For now, return true as placeholder
    try {
      // Example: await this.dataSource.query('SELECT 1');
      return true;
    } catch {
      return false;
    }
  }
}
