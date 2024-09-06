import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (user.password !== password) {
      throw new BadRequestException(`Invalid credentials!`);
    }

    return user;
  }

  getProtectedMessage() {
    return 'This is a protected message!';
  }
}

