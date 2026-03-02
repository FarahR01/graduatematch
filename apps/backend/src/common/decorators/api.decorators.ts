import { applyDecorators, SetMetadata } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

/**
 * Roles metadata key
 */
export const ROLES_KEY = 'roles';

/**
 * Roles decorator - Sets allowed roles for a route
 * Usage: @Roles('admin', 'company')
 */
export const Roles = (...roles: string[]): ReturnType<typeof SetMetadata> =>
  SetMetadata(ROLES_KEY, roles);

/**
 * Public decorator - Marks route as public (no auth required)
 */
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = (): ReturnType<typeof SetMetadata> => SetMetadata(IS_PUBLIC_KEY, true);

/**
 * ApiPagination decorator - Adds pagination query params to Swagger
 * Usage: @ApiPagination()
 */
export const ApiPagination = (): ReturnType<typeof applyDecorators> =>
  applyDecorators(
    ApiQuery({
      name: 'page',
      required: false,
      type: Number,
      description: 'Page number (1-indexed)',
      example: 1,
    }),
    ApiQuery({
      name: 'limit',
      required: false,
      type: Number,
      description: 'Items per page (max 100)',
      example: 20,
    }),
    ApiQuery({
      name: 'sortBy',
      required: false,
      type: String,
      description: 'Field to sort by',
      example: 'createdAt',
    }),
    ApiQuery({
      name: 'sortOrder',
      required: false,
      enum: ['asc', 'desc'],
      description: 'Sort order',
      example: 'desc',
    })
  );
