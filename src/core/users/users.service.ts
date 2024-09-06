import { PrismaService } from 'src/plugins/database/services/database.service';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

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

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        email: true,
        name: true,
        role: true,
        password: true,
        id: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User not found!`);
    }

    return user;
  }
}
