import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (user.password !== password) {
      throw new BadRequestException(`Invalid credentials!`);
    }

    return user;
  }

  async login(user: any) {
    const payload = {
      name: user.name,
      sub: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  getProtectedMessage() {
    return 'This is a protected message!';
  }
}
