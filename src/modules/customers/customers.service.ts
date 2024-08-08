import { PrismaService } from 'src/plugins/database/services/database.service';
import { UpdateCustomerDto } from './dtos/update-customer.dto';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateCustomerDto } from './dtos/create-customer.dto';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async getCustomerById(id: string) {
    const foundUser = await this.prisma.customer.findUnique({
      where: { id: id },
      include: {
        address: true,
      },
    });

    if (!foundUser) {
      throw new Error('User not found!');
    }

    return foundUser;
  }

  async getAllCustomers() {
    return await this.prisma.customer.findMany({
      include: {
        address: true,
      },
    });
  }

  async saveCustomer(customerData: CreateCustomerDto) {
    const newCustomer = await this.prisma.customer.create({
      data: {
        ...customerData,
        address: {
          create: customerData.address,
        },
      },
      select: {
        address: true,
        email: true,
        name: true,
        phoneNumber: true,
        socialMedia: true,
      },
    });

    return newCustomer;
  }

  async updateCustomer(id: string, dataToUpdate: UpdateCustomerDto) {
    const { address, ...data } = dataToUpdate;

    return await this.prisma.customer.update({
      where: {
        id,
      },
      data: {
        ...data,
        address: {
          update: address,
        },
      },
      select: {
        address: true,
        email: true,
        name: true,
        phoneNumber: true,
        socialMedia: true,
      },
    });
  }

  async removeCustomer(id: string) {
    await this.prisma.customer.delete({
      where: {
        id,
      },
      include: {
        services: true,
        address: true,
        pets: true,
      },
    });
  }
}
