import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from '../roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    const req = context.switchToHttp().getRequest();
    const { user } = req;

    const hasRole = () =>
      requiredRoles.some((requiredRole) => user?.roles?.includes(requiredRole));

    const valid = user && user.roles && hasRole();

    if (!valid)
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );

    return valid;
  }
}