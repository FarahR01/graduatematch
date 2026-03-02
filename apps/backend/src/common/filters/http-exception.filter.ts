import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * HttpExceptionFilter - Global exception handler
 * Transforms all HTTP exceptions into consistent error responses
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const errorResponse = {
      success: false,
      statusCode: status,
      error: HttpStatus[status] || 'Error',
      message: this.extractMessage(exceptionResponse),
      details: this.extractDetails(exceptionResponse),
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    // Log error for server-side debugging
    if (status >= 500) {
      this.logger.error(
        `${request.method} ${request.url} - ${status}: ${errorResponse.message}`,
        exception.stack
      );
    } else {
      this.logger.warn(`${request.method} ${request.url} - ${status}: ${errorResponse.message}`);
    }

    response.status(status).json(errorResponse);
  }

  private extractMessage(response: string | object): string {
    if (typeof response === 'string') {
      return response;
    }
    if (typeof response === 'object' && response !== null) {
      const obj = response as Record<string, unknown>;
      if (typeof obj.message === 'string') {
        return obj.message;
      }
      if (Array.isArray(obj.message)) {
        return obj.message[0] || 'Validation failed';
      }
    }
    return 'An error occurred';
  }

  private extractDetails(response: string | object): string[] | undefined {
    if (typeof response === 'object' && response !== null) {
      const obj = response as Record<string, unknown>;
      if (Array.isArray(obj.message)) {
        return obj.message;
      }
    }
    return undefined;
  }
}
