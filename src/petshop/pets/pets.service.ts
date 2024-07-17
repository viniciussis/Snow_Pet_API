import { PrismaService } from 'src/plugins/database/services/database.service';
import { UpdatePetDto } from './dtos/update-pet.dto';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class PetsService {
  constructor(private prisma: PrismaService) {}

  async getPetById(id: string) {
    const foundUser = await this.prisma.pet.findUnique({
      where: { id: id },
    });

    if (!foundUser) {
      throw new Error('User not found!');
    }

    return foundUser;
  }

  async getAllPets() {
    return await this.prisma.pet.findMany({});
  }

  async savePet(petData: Prisma.PetCreateInput) {
    const newPet = await this.prisma.pet.create({
      data: petData,
    });

    return newPet;
  }

  async updatePet(id: string, data: UpdatePetDto) {
    return await this.prisma.pet.update({
      where: {
        id,
      },
      data,
    });
  }

  async removePet(id: string) {
    return await this.prisma.pet.delete({
      where: {
        id,
      },
    });
  }
}
