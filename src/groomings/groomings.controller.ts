import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GroomingsService } from './groomings.service';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

@ApiTags('Groomings')
@Controller('v1/groomings')
export class GroomingsController {
  constructor(private readonly groomingsService: GroomingsService) {}

  @Get()
  @ApiOkResponse({ description: 'All the groomings got successfully...' })
  async getAllGroomings() {
    const allGroomings = await this.groomingsService.getAllGroomings();
    return allGroomings;
  }

  @Get('/:id')
  @ApiOkResponse({ description: 'Grooming got successfully...' })
  async getGrooming(@Param('id') id: string) {
    const grooming = await this.groomingsService.getGroomingById(id);
    return grooming;
  }

  @Post()
  @ApiCreatedResponse({ description: 'Grooming created successfully...' })
  async createGrooming(@Body() groomingData: Prisma.GroomingCreateInput) {
    const newGrooming = await this.groomingsService.saveGrooming(groomingData);
    return newGrooming;
  }

  @Patch('/:id')
  @ApiOkResponse({ description: 'Grooming created successfully...' })
  async updateGrooming(
    @Param('id') id: string,
    @Body() dataToUpdate: Prisma.GroomingUpdateInput,
  ) {
    const groomingUpdated = await this.groomingsService.updateGrooming(
      id,
      dataToUpdate,
    );
    return {
      message: 'Grooming successfully updated...',
      grooming: groomingUpdated,
    };
  }

  @Delete('/:id')
  @ApiNoContentResponse({ description: 'Grooming deleted successfully...' })
  async deleteGrooming(@Param('id') id: string) {
    const groomingDeleted = await this.groomingsService.removeGrooming(id);

    return {
      message: 'Grooming deleted successfully...',
      grooming: groomingDeleted,
    };
  }
}
