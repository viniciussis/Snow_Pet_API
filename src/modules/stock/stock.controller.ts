import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StockService } from './stock.service';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { UpdateStockDto } from './dtos/update-stock.dto';

@ApiTags('Stock')
@Controller('v1/stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Get()
  @ApiOkResponse({ description: 'All the stockProducts got successfully...' })
  async getAllStockProducts() {
    const allStockProducts = await this.stockService.getAllStockProducts();
    return allStockProducts;
  }

  @Get('/:id')
  @ApiOkResponse({ description: 'Stock got successfully...' })
  async getStock(@Param('id') id: string) {
    const stockProduct = await this.stockService.getStockById(id);
    return stockProduct;
  }

  @Patch('/:id')
  @ApiOkResponse({ description: 'Stock updated successfully...' })
  async updateStock(
    @Param('id') id: string,
    @Body()
    dataToUpdate: UpdateStockDto,
  ) {
    const stockProductUpdated = await this.stockService.updateStock(
      id,
      dataToUpdate,
    );
    return {
      message: 'Stock successfully updated...',
      stockProduct: stockProductUpdated,
    };
  }

  @Delete('/:id')
  @ApiNoContentResponse({ description: 'Stock deleted successfully...' })
  async deleteStock(@Param('id') id: string) {
    const stockProductDeleted = await this.stockService.removeStock(id);

    return {
      message: 'Stock deleted successfully...',
      stockProduct: stockProductDeleted,
    };
  }
}
