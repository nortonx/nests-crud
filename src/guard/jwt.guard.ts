import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return false;
    }

    try {
      const secret = this.configService.get('JWT_SECRET');
      const payload = this.jwtService.verify(token, { secret });
      const dataAtual = (Date.now() / 1000) | 0;
      if (payload.exp < dataAtual) {
        throw new Error();
      }
      req.email = payload.email;

    } catch (error: unknown) {
      return false;
    }

    return true;
  }
}
