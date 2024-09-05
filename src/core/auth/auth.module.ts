import { LocalStrategy } from './strategies/local.strategy';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [AuthController, PassportModule],
  providers: [AuthService, LocalStrategy, UsersService],
})
export class AuthModule {}

