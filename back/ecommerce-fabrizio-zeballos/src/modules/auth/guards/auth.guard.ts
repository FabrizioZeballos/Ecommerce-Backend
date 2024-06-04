import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

const validateRequest = async (
  req: Request & { user: any },
  jwtService: JwtService,
) => {
  if (!req.headers.authorization)
    throw new UnauthorizedException('Missing request authorization header');

  const token = req.headers.authorization.split(' ')[1];

  if (!token) throw new UnauthorizedException('Missing authentication token');

  try {
    const secret = process.env.JWT_SECRET;

    const payload = await jwtService.verifyAsync(token, { secret });

    payload.exp = new Date(payload.exp * 1000);

    req.user = payload;
  } catch (error) {
    throw new UnauthorizedException('Invalid token provided');
  }

  return true;
};

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    return validateRequest(request, this.jwtService);
  }
}
