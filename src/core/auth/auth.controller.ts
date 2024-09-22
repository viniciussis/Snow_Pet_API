import { Controller, Post, Request, Res, UseGuards } from '@nestjs/common';
import { LocalAuthGuard, RefreshTokenGuard } from '../../common/guards';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthRequest } from 'src/common/types';
import { AuthService } from './auth.service';
import { LocalAuthDto } from './dtos';
import { Response } from 'express';

@ApiTags('Authentication')
@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: LocalAuthDto })
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signin(@Request() req: AuthRequest, @Res() res: Response) {
    const { refresh_token, ...data } = await this.authService.signin(req.user);

    res.cookie('refresh_token', refresh_token, {
      secure: true,
      httpOnly: true,
      sameSite: true,
      maxAge: 1000 * 60 * 60 * 24 * 60 * 60,
    });

    return res.json(data);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  async refresh(@Request() req: AuthRequest, @Res() res: Response) {
    const { access_token, refresh_token } = await this.authService.getTokens(
      req.user,
    );

    await this.authService.updateRefreshToken(req.user.email, refresh_token);

    res.cookie('refresh_token', refresh_token, {
      secure: true,
      httpOnly: true,
      sameSite: true,
      maxAge: 1000 * 60 * 60 * 24 * 60 * 60,
    });

    return res.json({ access_token });
  }
}
