import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

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

  async saveCustomer(customerData: Prisma.CustomerCreateInput) {
    const newCustomer = await this.prisma.customer.create({
      data: customerData,
      include: {
        address: true,
      },
    });

    return newCustomer;
  }

  async updateCustomer(id: string, dataToUpdate: Prisma.CustomerUpdateInput) {
    return await this.prisma.customer.update({
      where: {
        id,
      },
      data: dataToUpdate,
    });
  }

  async removeCustomer(id: string) {
    return await this.prisma.customer.delete({
      where: {
        id,
      },
      include: {
        address: true,
      },
    });
  }
}
