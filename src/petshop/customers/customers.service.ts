import { PrismaService } from 'src/plugins/database/services/database.service';
import { Injectable } from '@nestjs/common';
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

  async saveCustomer(
    customerData: Omit<Prisma.CustomerCreateInput, 'address'> & {
      address: Prisma.AddressCreateWithoutCustomerInput;
    },
  ) {
    const newCustomer = await this.prisma.customer.create({
      data: {
        ...customerData,
        address: {
          create: customerData.address,
        },
      },
      include: {
        address: true,
      },
    });

    return newCustomer;
  }

  async updateCustomer(
    id: string,
    dataToUpdate: Omit<Prisma.CustomerUpdateInput, 'address'> & {
      address: Prisma.AddressUpdateWithoutCustomerInput;
    },
  ) {
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
