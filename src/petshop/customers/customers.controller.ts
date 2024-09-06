import {
  Controller,
  Delete,
  Patch,
  Param,
  Post,
  Body,
  Get,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseCustomerDto } from './dtos/resp-customer.dto';
import { CreateCustomerDto } from './dtos/create-customer.dto';
import { UpdateCustomerDto } from './dtos/update-customer.dto';
import { CustomersService } from './customers.service';

@ApiTags('Customers')
@Controller('v1/customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @ApiOperation({
    summary: 'Busca clientes',
    description: 'Faz uma busca que retorna um array de clientes...',
  })
  @ApiOkResponse({
    description: 'Cliente encontrados!',
    type: [ResponseCustomerDto],
  })
  @Get()
  async getAllCustomers(): Promise<ResponseCustomerDto[]> {
    const allCustomers = await this.customersService.getAllCustomers();
    return allCustomers;
  }

  @ApiOperation({
    summary: 'Busca um cliente',
    description:
      'Faz uma busca que retorna um cliente específico com base no ID passado como parâmetro...',
  })
  @ApiOkResponse({
    description: 'Cliente encontrado!',
    type: ResponseCustomerDto,
  })
  @Get('/:id')
  async getCustomer(@Param('id') id: string): Promise<ResponseCustomerDto> {
    const customer = await this.customersService.getCustomerById(id);
    return customer;
  }

  @ApiCreatedResponse({ description: 'Cliente criado com sucesso!' })
  @ApiOperation({
    summary: 'Cria um cliente',
    description:
      'Cria um cliente com base nos dados passados no corpo da requisição...',
  })
  @Post()
  async createCustomer(@Body() customerData: CreateCustomerDto): Promise<{
    customer: ResponseCustomerDto;
    statusCode: number;
    message: string;
  }> {
    const newCustomer = await this.customersService.saveCustomer(customerData);
    return {
      statusCode: 201,
      message: 'Cliente criado com sucesso!',
      customer: newCustomer,
    };
  }

  @ApiOkResponse({ description: 'Cliente atualizado com sucesso!' })
  @ApiOperation({
    summary: 'Atualiza um cliente',
    description:
      'Atualiza um cliente com base no ID passado como parâmetro e dados passados no corpo da requisição...',
  })
  @Patch('/:id')
  async updateCustomer(
    @Param('id') id: string,
    @Body()
    data: UpdateCustomerDto,
  ): Promise<{
    statusCode: number;
    message: string;
    customer: ResponseCustomerDto;
  }> {
    const customerUpdated = await this.customersService.updateCustomer(
      id,
      data,
    );
    return {
      statusCode: 200,
      message: 'Cliente atualizado com sucesso!',
      customer: customerUpdated,
    };
  }

  @ApiOkResponse({
    description: 'Cliente deletado com sucesso!',
  })
  @ApiOperation({
    summary: 'Exclui um cliente',
    description: 'Exclui um cliente com base no ID passado como parâmetro...',
  })
  @Delete('/:id')
  async deleteCustomer(
    @Param('id') id: string,
  ): Promise<{ statusCode: number; message: string }> {
    await this.customersService.removeCustomer(id);

    return {
      statusCode: 200,
      message: 'Cliente deletado com sucesso!',
    };
  }
}
