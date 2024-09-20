import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../../common/guards';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthRequest } from 'src/common/types';
import { AuthService } from './auth.service';
import { LocalAuthDto } from './dtos';

@ApiTags('Authentication')
@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: LocalAuthDto })
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signin(@Request() req: AuthRequest) {
    return this.authService.signin(req.user);
  }
}
