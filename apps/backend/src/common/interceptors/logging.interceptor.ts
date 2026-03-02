import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request } from 'express';

/**
 * LoggingInterceptor - Logs all incoming requests and response times
 * Useful for debugging and performance monitoring
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();
    const { method, url, ip } = request;
    const userAgent = request.get('user-agent') || '';
    const now = Date.now();

    return next.handle().pipe(
      tap({
        next: () => {
          const response = context.switchToHttp().getResponse<{ statusCode: number }>();
          const statusCode = response.statusCode;
          const duration = Date.now() - now;

          this.logger.log(
            `${method} ${url} ${statusCode.toString()} - ${duration.toString()}ms - ${ip || ''} - ${userAgent.substring(0, 50)}`
          );
        },
        error: (error: Error) => {
          const duration = Date.now() - now;
          this.logger.error(
            `${method} ${url} - ${duration.toString()}ms - ${ip || ''} - ${error.message}`
          );
        },
      })
    );
  }
}
