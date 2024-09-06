import {
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Body,
  Get,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UpdatePetDto } from './dtos/update-pet.dto';
import { ResponsePetDto } from './dtos/resp-pet.dto';
import { CreatePetDto } from './dtos/create-pet.dto';
import { PetsService } from './pets.service';

@ApiTags('Pets')
@Controller('v1/pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @ApiOperation({
    summary: 'Busca pets',
    description: 'Faz uma busca que retorna um array de pets...',
  })
  @ApiOkResponse({
    description: 'Pets encontrados!',
    type: [ResponsePetDto],
  })
  @Get()
  async getAllPets(): Promise<ResponsePetDto[]> {
    const allPets = await this.petsService.getAllPets();
    return allPets;
  }

  @ApiOperation({
    summary: 'Busca um pet',
    description:
      'Faz uma busca que retorna um pet específico com base no ID passado como parâmetro...',
  })
  @ApiOkResponse({
    description: 'Pet encontrado!',
    type: ResponsePetDto,
  })
  @Get('/:id')
  async getPet(@Param('id') id: string): Promise<ResponsePetDto> {
    const pet = await this.petsService.getPetById(id);
    return pet;
  }

  @ApiCreatedResponse({ description: 'Pet criado com sucesso!' })
  @ApiOperation({
    summary: 'Cria um pet',
    description:
      'Cria um pet com base nos dados passados no corpo da requisição...',
  })
  @Post()
  async createPet(@Body() petData: CreatePetDto): Promise<{
    pet: ResponsePetDto;
    statusCode: number;
    message: string;
  }> {
    const newPet = await this.petsService.savePet(petData);
    return {
      statusCode: 201,
      message: 'Pet criado com sucesso!',
      pet: newPet,
    };
  }

  @ApiOkResponse({ description: 'Pet atualizado com sucesso!' })
  @ApiOperation({
    summary: 'Atualiza um pet',
    description:
      'Atualiza um pet com base no ID passado como parâmetro e dados passados no corpo da requisição...',
  })
  @Patch('/:id')
  async updatePet(
    @Param('id') id: string,
    @Body() dataToUpdate: UpdatePetDto,
  ): Promise<{
    statusCode: number;
    message: string;
    pet: ResponsePetDto;
  }> {
    const petUpdated = await this.petsService.updatePet(id, dataToUpdate);
    return {
      statusCode: 200,
      message: 'Pet atualizado com sucesso!',
      pet: petUpdated,
    };
  }

  @ApiOkResponse({
    description: 'Pet deletado com sucesso!',
  })
  @ApiOperation({
    summary: 'Exclui um pet',
    description: 'Exclui um pet com base no ID passado como parâmetro...',
  })
  @Delete('/:id')
  async deletePet(
    @Param('id') id: string,
  ): Promise<{ statusCode: number; message: string }> {
    await this.petsService.removePet(id);

    return {
      statusCode: 200,
      message: 'Pet deletado com sucesso!',
    };
  }
}
