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
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateProductDto } from './dtos/update-product.dto';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductsService } from './products.service';

@ApiTags('Products')
@Controller('v1/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOkResponse({ description: 'All the products got successfully...' })
  async getAllProducts() {
    const allProducts = await this.productsService.getAllProducts();
    return allProducts;
  }

  @Get('/:id')
  @ApiOkResponse({ description: 'Product got successfully...' })
  async getProduct(@Param('id') id: string) {
    const product = await this.productsService.getProductById(id);
    return product;
  }

  @Post()
  @ApiCreatedResponse({ description: 'Product created successfully...' })
  async createProduct(
    @Body()
    productData: CreateProductDto,
  ) {
    const newProduct = await this.productsService.saveProduct(productData);
    return newProduct;
  }

  @Patch('/:id')
  @ApiOkResponse({ description: 'Product created successfully...' })
  async updateProduct(
    @Param('id') id: string,
    @Body()
    dataToUpdate: UpdateProductDto,
  ) {
    const productUpdated = await this.productsService.updateProduct(
      id,
      dataToUpdate,
    );
    return {
      message: 'Product successfully updated...',
      product: productUpdated,
    };
  }

  @Delete('/:id')
  @ApiNoContentResponse({ description: 'Product deleted successfully...' })
  async deleteProduct(@Param('id') id: string) {
    const productDeleted = await this.productsService.removeProduct(id);

    return {
      message: 'Product deleted successfully...',
      product: productDeleted,
    };
  }
}
