import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Response structure for transformed responses
 */
export interface TransformedResponse<T> {
  success: boolean;
  data: T;
  timestamp: string;
}

/**
 * TransformInterceptor - Wraps all responses in a consistent structure
 * Automatically adds success flag and timestamp
 */
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, TransformedResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<TransformedResponse<T>> {
    return next.handle().pipe(
      map(
        (data: T): TransformedResponse<T> => ({
          success: true,
          data,
          timestamp: new Date().toISOString(),
        })
      )
    );
  }
}
