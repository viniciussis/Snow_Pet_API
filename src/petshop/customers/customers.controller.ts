import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

@ApiTags('Customers')
@Controller('v1/customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  @ApiOkResponse({ description: 'All the customers got successfully...' })
  async getAllCustomers() {
    const allCustomers = await this.customersService.getAllCustomers();
    return allCustomers;
  }

  @Get('/:id')
  @ApiOkResponse({ description: 'Customer got successfully...' })
  async getCustomer(@Param('id') id: string) {
    const customer = await this.customersService.getCustomerById(id);
    return customer;
  }

  @Post()
  @ApiCreatedResponse({ description: 'Customer created successfully...' })
  async createCustomer(
    @Body()
    customerData: Omit<Prisma.CustomerCreateInput, 'address'> & {
      address: Prisma.AddressCreateWithoutCustomerInput;
    },
  ) {
    const newCustomer = await this.customersService.saveCustomer(customerData);
    return newCustomer;
  }

  @Patch('/:id')
  @ApiOkResponse({ description: 'Customer created successfully...' })
  async updateCustomer(
    @Param('id') id: string,
    @Body()
    dataToUpdate: Omit<Prisma.CustomerUpdateInput, 'address'> & {
      address: Prisma.AddressUpdateWithoutCustomerInput;
    },
  ) {
    const customerUpdated = await this.customersService.updateCustomer(
      id,
      dataToUpdate,
    );
    return {
      message: 'Customer successfully updated...',
      customer: customerUpdated,
    };
  }

  @Delete('/:id')
  @ApiNoContentResponse({ description: 'Customer deleted successfully...' })
  async deleteCustomer(@Param('id') id: string) {
    const customerDeleted = await this.customersService.removeCustomer(id);

    return {
      message: 'Customer deleted successfully...',
      customer: customerDeleted,
    };
  }
}
