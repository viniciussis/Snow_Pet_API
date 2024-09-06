import { PrismaService } from 'src/plugins/database/services/database.service';
import { UpdatePetDto } from './dtos/update-pet.dto';
import { CreatePetDto } from './dtos/create-pet.dto';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class PetsService {
  constructor(private prisma: PrismaService) {}

  async getPetById(id: string) {
    const foundPet = await this.prisma.pet.findUnique({
      where: { id: id },
    });

    if (!foundPet) {
      throw new Error('Pet not found!');
    }

    return foundPet;
  }

  async getAllPets() {
    return await this.prisma.pet.findMany({
      select: {
        id: true,
        additionalInfo: true,
        allergies: true,
        breed: true,
        combo: true,
        gender: true,
        name: true,
        healthProblems: true,
        size: true,
        specie: true,
        ownerId: true,
      },
    });
  }

  async savePet(petData: CreatePetDto) {
    const newPet = await this.prisma.pet.create({
      data: petData,
      select: {
        id: true,
        additionalInfo: true,
        allergies: true,
        breed: true,
        combo: true,
        gender: true,
        name: true,
        healthProblems: true,
        size: true,
        specie: true,
        ownerId: true,
      },
    });

    return newPet;
  }

  async updatePet(id: string, data: UpdatePetDto) {
    return await this.prisma.pet.update({
      where: {
        id,
      },
      data,
      select: {
        id: true,
        additionalInfo: true,
        allergies: true,
        breed: true,
        combo: true,
        gender: true,
        name: true,
        healthProblems: true,
        size: true,
        specie: true,
        ownerId: true,
      },
    });
  }

  async removePet(id: string) {
    await this.prisma.pet.delete({
      where: {
        id,
      },
      include: {
        groomings: true,
      },
    });
  }
}
