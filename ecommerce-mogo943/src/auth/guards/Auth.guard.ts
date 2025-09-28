import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const request: Request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if(!authHeader) throw new UnauthorizedException('Authorization header missing');

    if(!authHeader.startsWith('Basic ')) throw new UnauthorizedException('Invalid authorization scheme');

    const credentials = authHeader.replace('Basic ', '').trim();
    const [ email, password ] = credentials.split(':');

    if(!email || !password) throw new UnauthorizedException('Invalid authorization format. Expected Basic <email>:<password>')

    return true;
  }
}
