import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateProductDto } from './dtos/update-product.dto';
import { CreateProductDto } from './dtos/create-product.dto';
import { ResponseProductDto } from './dtos/resp-product.dto';
import { ProductsService } from './products.service';

@ApiTags('Products')
@Controller('v1/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({
    summary: 'Busca produtos',
    description: 'Faz uma busca que retorna um array de produtos...',
  })
  @ApiOkResponse({
    description: 'Produtos encontrados!',
    type: [ResponseProductDto],
  })
  @Get()
  async getAllProducts(): Promise<ResponseProductDto[]> {
    const allProducts = await this.productsService.getAllProducts();
    return allProducts;
  }

  @ApiOperation({
    summary: 'Busca um produto',
    description:
      'Faz uma busca que retorna um produto específico com base no ID passado como parâmetro...',
  })
  @ApiOkResponse({
    description: 'Produto encontrado!',
    type: ResponseProductDto,
  })
  @Get('/:id')
  async getProduct(@Param('id') id: string): Promise<ResponseProductDto> {
    const product = await this.productsService.getProductById(id);
    return product;
  }

  @ApiCreatedResponse({ description: 'Produto criado com sucesso!' })
  @ApiOperation({
    summary: 'Cria um produto',
    description:
      'Cria um produto com base nos dados passados no corpo da requisição...',
  })
  @Post()
  async createProduct(
    @Body()
    productData: CreateProductDto,
  ): Promise<{
    product: ResponseProductDto;
    statusCode: number;
    message: string;
  }> {
    const newProduct = await this.productsService.saveProduct(productData);
    return {
      statusCode: 201,
      message: 'Produto criado com sucesso!',
      product: newProduct,
    };
  }

  @ApiOkResponse({ description: 'Produto atualizado com sucesso!' })
  @ApiOperation({
    summary: 'Atualiza um produto',
    description:
      'Atualiza um produto com base no ID passado como parâmetro e dados passados no corpo da requisição...',
  })
  @Patch('/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body()
    dataToUpdate: UpdateProductDto,
  ): Promise<{
    statusCode: number;
    message: string;
    product: ResponseProductDto;
  }> {
    const productUpdated = await this.productsService.updateProduct(
      id,
      dataToUpdate,
    );
    return {
      statusCode: 200,
      message: 'Produto atualizado com sucesso!',
      product: productUpdated,
    };
  }

  @ApiOkResponse({
    description: 'Produto deletado com sucesso!',
  })
  @ApiOperation({
    summary: 'Exclui um produto',
    description: 'Exclui um produto com base no ID passado como parâmetro...',
  })
  @Delete('/:id')
  async deleteProduct(
    @Param('id') id: string,
  ): Promise<{ statusCode: number; message: string }> {
    await this.productsService.removeProduct(id);

    return {
      statusCode: 200,
      message: 'Produto deletado com sucesso!',
    };
  }
}
