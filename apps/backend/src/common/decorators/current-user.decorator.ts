import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@/modules/user/domain/user.entity';

/**
 * CurrentUser decorator - Extracts authenticated user from request
 * Usage: @CurrentUser() user: User
 * Must be used with JwtAuthGuard
 */
export const CurrentUser = createParamDecorator(
  (data: keyof User | undefined, ctx: ExecutionContext): User | null => {
    const request = ctx.switchToHttp().getRequest<{ user?: User }>();
    const user = request.user;

    if (!user) {
      return null;
    }

    // If a specific property is requested, return that property value

    return data ? (user[data] as User) : user;
  }
);

/**
 * CurrentUserId decorator - Shorthand for getting just the user ID
 * Usage: @CurrentUserId() userId: string
 */
export const CurrentUserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string | null => {
    const request = ctx.switchToHttp().getRequest<{ user?: User }>();
    const user = request.user;
    return user?.id ?? null;
  }
);
