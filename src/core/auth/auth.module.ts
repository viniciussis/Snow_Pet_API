import { AccessTokenStrategy, LocalStrategy } from './strategies';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [AuthService, LocalStrategy, AccessTokenStrategy, LocalStrategy],
  controllers: [AuthController],
  exports: [AuthService],
  imports: [
    PassportModule,
    UsersModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('ACCESS_TOKEN_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('ACCESS_TOKEN_EXPIRATION'),
        },
      }),
    }),
  ],
})
export class AuthModule {}
