import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/api.decorators';

/**
 * JwtAuthGuard - Validates JWT tokens on protected routes
 * Use @Public() decorator to skip authentication for specific routes
 *
 * Note: This is a placeholder. Real implementation should use
 * @nestjs/passport with JwtStrategy for proper JWT validation.
 */
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Check if route is marked as public
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('No authorization header');
    }

    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid authorization format');
    }

    // TODO: Replace with actual JWT verification
    // This should use JwtService.verify() or passport-jwt strategy
    try {
      // Placeholder: In real implementation, decode and verify JWT
      // const decoded = this.jwtService.verify(token);
      // request.user = decoded;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
