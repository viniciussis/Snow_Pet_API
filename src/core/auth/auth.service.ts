import { AccessTokenPayload, UserRequest } from 'src/common/types';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signin(user: UserRequest) {
    const { access_token } = await this._getTokens(user);

    return {
      access_token,
      role: user.role,
      user_id: user.id,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    const isMatch = await this._compareData(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException(`Email ou senha inválidos!`);
    }

    return user;
  }

  private async _getTokens(user: UserRequest) {
    const accessTokenPayload: AccessTokenPayload = {
      role: user.role,
      sub: user.id,
    };

    return {
      access_token: this.jwtService.sign(accessTokenPayload, {
        expiresIn: this.configService.get<string>('ACCESS_TOKEN_EXPIRATION'),
        secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
      }),
    };
  }

  private async _hashData(rawData: string) {
    const SALT = await bcrypt.genSalt();
    return bcrypt.hash(rawData, SALT);
  }

  private async _compareData(rawData: string, hashedData: string) {
    return await bcrypt.compare(rawData, hashedData);
  }
}
