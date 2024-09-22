import { BadRequestException, Injectable } from '@nestjs/common';
import { RefreshTokenPayload } from 'src/common/types';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { Request } from 'express';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      secretOrKey: configService.get<string>('REFRESH_TOKEN_SECRET'),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          const refresh_token = req.cookies['refresh_token'];
          if (!refresh_token) {
            throw new BadRequestException('Missing refresh token!');
          }
          return refresh_token;
        },
      ]),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: RefreshTokenPayload) {
    const refreshToken = req.cookies?.['refresh_token'];

    return this.authService.validateToken(payload.email, refreshToken);
  }
}
