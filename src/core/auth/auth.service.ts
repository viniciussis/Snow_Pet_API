import {
  RefreshTokenPayload,
  AccessTokenPayload,
  UserRequest,
} from 'src/common/types';
import { PrismaService } from 'src/plugins/database/services/database.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignupDto } from './dtos';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async signup(userData: SignupDto) {
    const hashedPassword = await this.hashData(userData.password);

    const user = await this.userService.createUser({
      ...userData,
      password: hashedPassword,
    });

    const { access_token, refresh_token } = await this.getTokens(user);

    const hashedToken = await this.hashData(refresh_token);

    await this.updateRefreshToken(user.email, hashedToken);

    return {
      access_token,
      refresh_token,
      role: user.role,
      user_id: user.id,
    };
  }

  async signin(user: UserRequest) {
    const { access_token, refresh_token } = await this.getTokens(user);

    const hashedToken = await this.hashData(refresh_token);

    await this.updateRefreshToken(user.email, hashedToken);

    return {
      access_token,
      refresh_token,
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

  async validateToken(email: string, refreshToken: string) {
    const user = await this.userService.findByEmail(email);

    if (!user.refresh_token) {
      throw new UnauthorizedException('Invalid refresh token!');
    }

    const isMatch = await this._compareData(refreshToken, user.refresh_token);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid refresh token!');
    }

    return user;
  }

  async getTokens(user: UserRequest) {
    const accessTokenPayload: AccessTokenPayload = {
      role: user.role,
      sub: user.id,
    };
    const refreshTokenPayload: RefreshTokenPayload = {
      email: user.email,
      role: user.role,
      sub: user.id,
    };

    return {
      access_token: this.jwtService.sign(accessTokenPayload, {
        secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
        expiresIn: this.configService.get<string>('ACCESS_TOKEN_EXPIRATION'),
      }),
      refresh_token: this.jwtService.sign(refreshTokenPayload, {
        secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
        expiresIn: this.configService.get<string>('REFRESH_TOKEN_EXPIRATION'),
      }),
    };
  }

  async updateRefreshToken(email: string, refresh_token: string | null) {
    await this.prisma.user.update({
      where: {
        email,
      },
      data: {
        refresh_token,
      },
    });
  }

  async hashData(rawData: string) {
    const SALT = await bcrypt.genSalt();
    return bcrypt.hash(rawData, SALT);
  }

  private async _compareData(rawData: string, hashedData: string) {
    return await bcrypt.compare(rawData, hashedData);
  }
}
