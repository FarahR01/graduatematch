import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * Standard API response wrapper
 * Provides consistent response structure across all endpoints
 */
export class ApiResponseDto<T> {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiPropertyOptional({ description: 'Response data' })
  data?: T;

  @ApiPropertyOptional({ example: 'Operation completed successfully' })
  message?: string;

  @ApiPropertyOptional({ example: '2026-03-01T12:00:00.000Z' })
  timestamp: string;

  constructor(data?: T, message?: string, success: boolean = true) {
    this.success = success;
    this.data = data;
    this.message = message;
    this.timestamp = new Date().toISOString();
  }

  static success<T>(data?: T, message?: string): ApiResponseDto<T> {
    return new ApiResponseDto(data, message, true);
  }

  static error(message: string): ApiResponseDto<null> {
    return new ApiResponseDto(null, message, false);
  }
}

/**
 * Error response DTO for API documentation
 */
export class ErrorResponseDto {
  @ApiProperty({ example: false })
  success: boolean = false;

  @ApiProperty({ example: 400 })
  statusCode!: number;

  @ApiProperty({ example: 'Bad Request' })
  error!: string;

  @ApiProperty({ example: 'Validation failed' })
  message!: string;

  @ApiPropertyOptional({
    example: ['email must be a valid email'],
    description: 'Detailed validation errors',
  })
  details?: string[];

  @ApiProperty({ example: '2026-03-01T12:00:00.000Z' })
  timestamp: string = new Date().toISOString();

  @ApiPropertyOptional({ example: '/api/users' })
  path?: string;
}

/**
 * Delete response DTO
 */
export class DeleteResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'Resource deleted successfully' })
  message: string;

  constructor(success: boolean, message: string = 'Resource deleted successfully') {
    this.success = success;
    this.message = success ? message : 'Failed to delete resource';
  }
}
