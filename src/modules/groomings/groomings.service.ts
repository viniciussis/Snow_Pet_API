import { PrismaService } from 'src/plugins/database/services/database.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UpdateGroomingDto } from './dtos/update-grooming.dto';

@Injectable()
export class GroomingsService {
  constructor(private prisma: PrismaService) {}

  async getGroomingById(id: string) {
    const foundGrooming = await this.prisma.grooming.findUnique({
      where: { id: id },
    });

    if (!foundGrooming) {
      throw new Error('Grooming not found!');
    }

    return foundGrooming;
  }

  async getAllGroomings() {
    return await this.prisma.grooming.findMany({});
  }

  async saveGrooming(groomingData: Prisma.GroomingCreateInput) {
    const newGrooming = await this.prisma.grooming.create({
      data: groomingData,
    });

    return newGrooming;
  }

  async updateGrooming(id: string, dataToUpdate: UpdateGroomingDto) {
    return await this.prisma.grooming.update({
      where: {
        id,
      },
      data: dataToUpdate,
    });
  }

  async removeGrooming(id: string) {
    return await this.prisma.grooming.delete({
      where: {
        id,
      },
    });
  }
}