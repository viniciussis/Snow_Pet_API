import {
  Controller,
  UseGuards,
  Request,
  Post,
  Body,
  Res,
} from '@nestjs/common';
import { LocalAuthGuard, RefreshTokenGuard } from '../../common/guards';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthRequest } from 'src/common/types';
import { SigninDto, SignupDto } from './dtos';
import { AuthService } from './auth.service';
import { Response } from 'express';

@ApiTags('Authentication')
@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() userData: SignupDto, @Res() res: Response) {
    const { refresh_token, ...data } = await this.authService.signup(userData);

    res.cookie('refresh_token', refresh_token, {
      secure: true,
      httpOnly: true,
      sameSite: true,
      maxAge: 1000 * 60 * 60 * 24 * 60 * 60,
    });

    return res.json(data);
  }

  @ApiBody({ type: SigninDto })
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

    const hashedToken = await this.authService.hashData(refresh_token);

    await this.authService.updateRefreshToken(req.user.email, hashedToken);

    res.cookie('refresh_token', refresh_token, {
      secure: true,
      httpOnly: true,
      sameSite: true,
      maxAge: 1000 * 60 * 60 * 24 * 60 * 60,
    });

    return res.json({ access_token });
  }

  @Post('logout')
  @UseGuards(RefreshTokenGuard)
  async logout(@Request() req: AuthRequest, @Res() res: Response) {
    await this.authService.updateRefreshToken(req.user.email, null);

    res.clearCookie('refresh_token');

    return res.json({
      statusCode: 200,
      message: 'User logged out successfully!',
    });
  }
}
