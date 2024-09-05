import { PrismaService } from 'src/plugins/database/services/database.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  async getServiceById(id: string) {
    const foundService = await this.prisma.service.findUnique({
      where: { id: id },
    });

    if (!foundService) {
      throw new Error('Service not found!');
    }

    return foundService;
  }

  async getAllServices() {
    return await this.prisma.service.findMany({});
  }

  async saveService(serviceData: Prisma.ServiceCreateInput) {
    const newService = await this.prisma.service.create({
      data: serviceData,
    });

    return newService;
  }

  async updateService(id: string, dataToUpdate: Prisma.ServiceUpdateInput) {
    return await this.prisma.service.update({
      where: {
        id,
      },
      data: dataToUpdate,
    });
  }

  async removeService(id: string) {
    return await this.prisma.service.delete({
      where: {
        id,
      },
    });
  }
}
