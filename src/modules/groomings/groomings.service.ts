import { PrismaService } from 'src/plugins/database/services/database.service';
import { UpdateGroomingDto } from './dtos/update-grooming.dto';
import { CreateGroomingDto } from './dtos/create-grooming.dto';
import { Injectable } from '@nestjs/common';

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
    return await this.prisma.grooming.findMany({
      select: {
        date: true,
        petId: true,
        price: true,
        type: true,
        id: true,
      },
    });
  }

  async saveGrooming(groomingData: CreateGroomingDto) {
    const newGrooming = await this.prisma.grooming.create({
      data: groomingData,
      select: {
        date: true,
        petId: true,
        price: true,
        type: true,
        id: true,
      },
    });

    return newGrooming;
  }

  async updateGrooming(id: string, dataToUpdate: UpdateGroomingDto) {
    return await this.prisma.grooming.update({
      where: {
        id,
      },
      data: dataToUpdate,
      select: {
        date: true,
        petId: true,
        price: true,
        type: true,
        id: true,
      },
    });
  }

  async removeGrooming(id: string) {
    await this.prisma.grooming.delete({
      where: {
        id,
      },
      include: {
        itemService: true,
      },
    });
  }
}
