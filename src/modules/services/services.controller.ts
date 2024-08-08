import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

@ApiTags('Services')
@Controller('v1/services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @ApiOperation({
    summary: 'Busca atendimentos',
    description: 'Faz uma busca que retorna um array de atendimentos...',
  })
  @ApiOkResponse({
    description: 'Atendimentos encontrados!',
  })
  @Get()
  async getAllServices() {
    const allServices = await this.servicesService.getAllServices();
    return allServices;
  }

  @ApiOperation({
    summary: 'Busca um atendimento',
    description:
      'Faz uma busca que retorna um atendimento específico com base no ID passado como parâmetro...',
  })
  @ApiOkResponse({
    description: 'Serviços encontrado!',
  })
  @Get('/:id')
  async getService(@Param('id') id: string) {
    const service = await this.servicesService.getServiceById(id);
    return service;
  }

  @ApiCreatedResponse({ description: 'Atendimento criado com sucesso!' })
  @ApiOperation({
    summary: 'Cria um atendimento',
    description:
      'Cria um atendimento com base nos dados passados no corpo da requisição...',
  })
  @Post()
  async createService(@Body() serviceData: Prisma.ServiceCreateInput) {
    const newService = await this.servicesService.saveService(serviceData);
    return newService;
  }

  @ApiOkResponse({ description: 'Atendimento atualizado com sucesso!' })
  @ApiOperation({
    summary: 'Atualiza um atendimento',
    description:
      'Atualiza um atendimento com base no ID passado como parâmetro e dados passados no corpo da requisição...',
  })
  @Patch('/:id')
  async updateService(
    @Param('id') id: string,
    @Body() dataToUpdate: Prisma.ServiceUpdateInput,
  ) {
    const serviceUpdated = await this.servicesService.updateService(
      id,
      dataToUpdate,
    );
    return {
      statusCode: 200,
      message: 'Atendimento atualizado com sucesso!',
      service: serviceUpdated,
    };
  }

  @ApiOkResponse({
    description: 'Atendimento deletado com sucesso!',
  })
  @ApiOperation({
    summary: 'Exclui um atendimento',
    description:
      'Exclui um atendimento com base no ID passado como parâmetro...',
  })
  @Delete('/:id')
  async deleteService(@Param('id') id: string) {
    await this.servicesService.removeService(id);

    return {
      message: 'Atendimento deletado com sucesso!',
      statusCode: 200,
    };
  }
}
