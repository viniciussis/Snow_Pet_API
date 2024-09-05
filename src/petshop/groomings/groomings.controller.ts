import {
  Controller,
  Delete,
  Patch,
  Param,
  Post,
  Body,
  Get,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';
import { UpdateGroomingDto } from './dtos/update-grooming.dto';
import { ResponseGroomingDto } from './dtos/resp-grooming.dto';
import { CreateGroomingDto } from './dtos/create-grooming.dto';
import { GroomingsService } from './groomings.service';

@ApiTags('Groomings')
@Controller('v1/groomings')
export class GroomingsController {
  constructor(private readonly groomingsService: GroomingsService) {}

  @ApiOperation({
    summary: 'Busca serviços de pets',
    description: 'Faz uma busca que retorna um array de serviços de pets...',
  })
  @ApiOkResponse({
    description: 'Serviços de pet encontrados!',
    type: [ResponseGroomingDto],
  })
  @Get()
  async getAllGroomings(): Promise<ResponseGroomingDto[]> {
    const allGroomings = await this.groomingsService.getAllGroomings();
    return allGroomings;
  }

  @ApiOperation({
    summary: 'Busca um serviço de pet',
    description:
      'Faz uma busca que retorna um serviço de pet específico com base no ID passado como parâmetro...',
  })
  @ApiOkResponse({
    description: 'Serviço de pet encontrado!',
    type: ResponseGroomingDto,
  })
  @Get('/:id')
  async getGrooming(@Param('id') id: string): Promise<ResponseGroomingDto> {
    const grooming = await this.groomingsService.getGroomingById(id);
    return grooming;
  }

  @ApiCreatedResponse({ description: 'Serviço de pet criado com sucesso!' })
  @ApiOperation({
    summary: 'Cria um serviço de pet',
    description:
      'Cria um serviço de pet com base nos dados passados no corpo da requisição...',
  })
  @Post()
  async createGrooming(@Body() groomingData: CreateGroomingDto): Promise<{
    grooming: ResponseGroomingDto;
    statusCode: number;
    message: string;
  }> {
    const newGrooming = await this.groomingsService.saveGrooming(groomingData);
    return {
      statusCode: 201,
      message: 'Serviço de pet criado com sucesso!!',
      grooming: newGrooming,
    };
  }

  @ApiOkResponse({ description: 'Serviço de pet atualizado com sucesso!' })
  @ApiOperation({
    summary: 'Atualiza um serviço de pet',
    description:
      'Atualiza um serviço de pet com base no ID passado como parâmetro e dados passados no corpo da requisição...',
  })
  @Patch('/:id')
  async updateGrooming(
    @Param('id') id: string,
    @Body() dataToUpdate: UpdateGroomingDto,
  ): Promise<{
    statusCode: number;
    message: string;
    grooming: ResponseGroomingDto;
  }> {
    const groomingUpdated = await this.groomingsService.updateGrooming(
      id,
      dataToUpdate,
    );
    return {
      statusCode: 200,
      message: 'Serviço de pet atualizado com sucesso!',
      grooming: groomingUpdated,
    };
  }

  @ApiOkResponse({
    description: 'Serviço de pet deletado com sucesso!',
  })
  @ApiOperation({
    summary: 'Exclui um serviço de pet',
    description:
      'Exclui um serviço de pet com base no ID passado como parâmetro...',
  })
  @Delete('/:id')
  async deleteGrooming(
    @Param('id') id: string,
  ): Promise<{ statusCode: number; message: string }> {
    await this.groomingsService.removeGrooming(id);

    return {
      statusCode: 200,
      message: 'Serviço de pet deletado com sucesso!',
    };
  }
}
