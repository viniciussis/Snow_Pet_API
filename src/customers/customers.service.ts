import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaService } from 'src/prisma/prisma.service';

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
        name: customerData.name,
        phoneNumber: customerData.phoneNumber,
        email: customerData.email,
        socialMedia: customerData.socialMedia,
        address: {
          create: {
            houseNumber: customerData.houseNumber,
            neighborhood: customerData.neighborhood,
            street: customerData.street,
            complement: customerData.complement,
          },
        },
      },
      include: {
        address: true,
      },
    });

    return newCustomer;
  }

  async updateCustomer(id: string, dataToUpdate: UpdateCustomerDto) {
    return await this.prisma.customer.update({
      where: {
        id: id,
      },
      data: dataToUpdate,
    });
  }

  async removeCustomer(id: string) {
    return await this.prisma.customer.delete({
      where: {
        id: id,
      },
      include: {
        address: true,
      },
    });
  }
}
