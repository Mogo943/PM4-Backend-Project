import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const request: Request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if(!authHeader) return false;
    if(!authHeader.startsWith('Basic ')) return false;

    const credentials = authHeader.split(' ')[1];
    const [ email, password ] = credentials.split(':');

    if(!email || !password)  return false;

    return true;
  }
}
