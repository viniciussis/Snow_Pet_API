import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { IsAuthenticatedGuard } from './guards/is-authenticaded.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }

  @UseGuards(IsAuthenticatedGuard)
  @Get('protected')
  getProtectedMessage(): string {
    return this.authService.getProtectedMessage();
  }
}

