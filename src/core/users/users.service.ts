import { PrismaService } from 'src/plugins/database/services/database.service';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SignupDto } from '../auth/dtos';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        refresh_token: true,
        password: true,
        email: true,
        role: true,
        id: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User not found!`);
    }

    return user;
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        email: true,
        name: true,
        role: true,
        id: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User not found!`);
    }

    return user;
  }

  async findAll() {
    return await this.prisma.user.findMany({});
  }

  async createUser(userData: SignupDto) {
    await this._verifyEmail(userData.email);

    return await this.prisma.user.create({
      data: userData,
      select: {
        refresh_token: true,
        password: true,
        email: true,
        role: true,
        id: true,
      },
    });
  }

  private async _verifyEmail(email: string) {
    const emailExists = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (emailExists) {
      throw new ConflictException('Email already exists!');
    }
  }
}
