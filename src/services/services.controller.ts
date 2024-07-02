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
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

@ApiTags('Services')
@Controller('v1/services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  @ApiOkResponse({ description: 'All the services got successfully...' })
  async getAllServices() {
    const allServices = await this.servicesService.getAllServices();
    return allServices;
  }

  @Get('/:id')
  @ApiOkResponse({ description: 'Service got successfully...' })
  async getService(@Param('id') id: string) {
    const service = await this.servicesService.getServiceById(id);
    return service;
  }

  @Post()
  @ApiCreatedResponse({ description: 'Service created successfully...' })
  async createService(@Body() serviceData: Prisma.ServiceCreateInput) {
    const newService = await this.servicesService.saveService(serviceData);
    return newService;
  }

  @Patch('/:id')
  @ApiOkResponse({ description: 'Service created successfully...' })
  async updateService(
    @Param('id') id: string,
    @Body() dataToUpdate: Prisma.ServiceUpdateInput,
  ) {
    const serviceUpdated = await this.servicesService.updateService(
      id,
      dataToUpdate,
    );
    return {
      message: 'Service successfully updated...',
      service: serviceUpdated,
    };
  }

  @Delete('/:id')
  @ApiNoContentResponse({ description: 'Service deleted successfully...' })
  async deleteService(@Param('id') id: string) {
    const serviceDeleted = await this.servicesService.removeService(id);

    return {
      message: 'Service deleted successfully...',
      service: serviceDeleted,
    };
  }
}
