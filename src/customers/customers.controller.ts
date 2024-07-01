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
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

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
  async createCustomer(@Body() customerData: CreateCustomerDto) {
    const newCustomer = await this.customersService.saveCustomer(customerData);
    return newCustomer;
  }

  @Patch('/:id')
  @ApiOkResponse({ description: 'Customer created successfully...' })
  async updateCustomer(
    @Param('id') id: string,
    @Body() dataToUpdate: UpdateCustomerDto,
  ) {
    const customerUpdated = await this.customersService.updateCustomer(
      id,
      dataToUpdate,
    );
    return {
      updated: customerUpdated,
      message: 'Customer successfully updated...',
    };
  }

  @Delete('/:id')
  @ApiNoContentResponse({ description: 'Customer deleted successfully...' })
  async deleteCustomer(@Param('id') id: string) {
    const customerDeleted = await this.customersService.removeCustomer(id);

    return {
      deleted: customerDeleted,
      message: 'Customer deleted successfully...',
    };
  }
}
