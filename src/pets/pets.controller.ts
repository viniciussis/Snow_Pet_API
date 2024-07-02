import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PetsService } from './pets.service';
import {
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

@ApiTags('Pets')
@Controller('v1/pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Get()
  @ApiOkResponse({ description: 'All the pets got successfully...' })
  async getAllPets() {
    const allPets = await this.petsService.getAllPets();
    return allPets;
  }

  @Get('/:id')
  @ApiOkResponse({ description: 'Pet got successfully...' })
  async getPet(@Param('id') id: string) {
    const pet = await this.petsService.getPetById(id);
    return pet;
  }

  @Post()
  @ApiCreatedResponse({ description: 'Pet created successfully...' })
  async createPet(@Body() petData: Prisma.PetCreateInput) {
    const newPet = await this.petsService.savePet(petData);
    return newPet;
  }

  @Patch('/:id')
  @ApiOkResponse({ description: 'Pet created successfully...' })
  async updatePet(
    @Param('id') id: string,
    @Body() dataToUpdate: Prisma.PetUpdateInput,
  ) {
    const petUpdated = await this.petsService.updatePet(id, dataToUpdate);
    return {
      message: 'Pet successfully updated...',
      pet: petUpdated,
    };
  }

  @Delete('/:id')
  @ApiNoContentResponse({ description: 'Pet deleted successfully...' })
  async deletePet(@Param('id') id: string) {
    const petDeleted = await this.petsService.removePet(id);

    return {
      message: 'Pet deleted successfully...',
      pet: petDeleted,
    };
  }
}
