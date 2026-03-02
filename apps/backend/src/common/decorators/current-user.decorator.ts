import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@/modules/user/domain/user.entity';

/**
 * CurrentUser decorator - Extracts authenticated user from request
 * Usage: @CurrentUser() user: User
 * Must be used with JwtAuthGuard
 */
export const CurrentUser = createParamDecorator(
  (data: keyof User | undefined, ctx: ExecutionContext): User | unknown => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as User;

    if (!user) {
      return null;
    }

    // If a specific property is requested, return that
    return data ? user[data] : user;
  },
);

/**
 * CurrentUserId decorator - Shorthand for getting just the user ID
 * Usage: @CurrentUserId() userId: string
 */
export const CurrentUserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string | null => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as User;
    return user?.id ?? null;
  },
);
