import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import type { UserType } from '@prisma/client';

export interface JwtPayload {
    email: string;
    sub: string;
    type: UserType;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'defaultSecret'

    });
  }

  async validate(payload: JwtPayload) {
    return { id: payload.sub, email: payload.email, type: payload.type };
  }
}