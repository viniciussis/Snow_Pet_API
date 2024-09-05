import { Controller, Param, Patch, Body, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateStockDto } from './dtos/update-stock.dto';
import { StockService } from './stock.service';
import { ResponseStockDto } from './dtos/resp-stock.dto';

@ApiTags('Stock')
@Controller('v1/stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @ApiOperation({
    summary: 'Busca estoque de produtos',
    description: 'Faz uma busca que retorna um array de estoque de produtos...',
  })
  @ApiOkResponse({
    description: 'Produtos em estoque encontrados!',
    type: [ResponseStockDto],
  })
  @Get()
  async getAllStockProducts(): Promise<ResponseStockDto[]> {
    const allStockProducts = await this.stockService.getAllStockProducts();
    return allStockProducts;
  }

  @ApiOperation({
    summary: 'Busca um estoque de produto especifico',
    description:
      'Faz uma busca que retorna um estoque de um produto específico com base no ID passado como parâmetro...',
  })
  @ApiOkResponse({
    description: 'Produto encontrado em estoque!',
    type: ResponseStockDto,
  })
  @Get('/:id')
  async getStock(@Param('id') id: string): Promise<ResponseStockDto> {
    const stockProduct = await this.stockService.getStockById(id);
    return stockProduct;
  }

  @ApiOkResponse({ description: 'Estoque atualizado com sucesso!' })
  @ApiOperation({
    summary: 'Atualiza o estoque de um produto',
    description:
      'Atualiza um estoque de produto com base no ID passado como parâmetro e dados passados no corpo da requisição...',
  })
  @Patch('/:id')
  async updateStock(
    @Param('id') id: string,
    @Body()
    dataToUpdate: UpdateStockDto,
  ): Promise<{
    statusCode: number;
    message: string;
    stock: ResponseStockDto;
  }> {
    const stockProductUpdated = await this.stockService.updateStock(
      id,
      dataToUpdate,
    );
    return {
      statusCode: 200,
      message: 'Estoque atualizado com sucesso!',
      stock: stockProductUpdated,
    };
  }
}
