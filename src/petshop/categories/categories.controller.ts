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
import { ResponseCategoryDto } from './dtos/resp-category.dto';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { CategoriesService } from './categories.service';

@ApiTags('Categories')
@Controller('v1/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({
    summary: 'Busca categorias',
    description: 'Faz uma busca que retorna um array de categorias...',
  })
  @ApiOkResponse({
    description: 'Categorias encontrados!',
    type: [ResponseCategoryDto],
  })
  @Get()
  async getAllCategories(): Promise<ResponseCategoryDto[]> {
    const allCategories = await this.categoriesService.getAllCategories();
    return allCategories;
  }

  @ApiOperation({
    summary: 'Busca uma categoria',
    description:
      'Faz uma busca que retorna uma categoria específico com base no ID passado como parâmetro...',
  })
  @ApiOkResponse({
    description: 'Categoria encontrado!',
    type: ResponseCategoryDto,
  })
  @Get('/:id')
  async getCategory(@Param('id') id: string): Promise<ResponseCategoryDto> {
    const category = await this.categoriesService.getCategoryById(id);
    return category;
  }

  @ApiCreatedResponse({ description: 'Categoria criada com sucesso!' })
  @ApiOperation({
    summary: 'Cria uma categoria',
    description:
      'Cria uma categoria com base nos dados passados no corpo da requisição...',
  })
  @Post()
  async createCategory(
    @Body()
    categoryData: CreateCategoryDto,
  ): Promise<{
    category: ResponseCategoryDto;
    statusCode: number;
    message: string;
  }> {
    const newCategory = await this.categoriesService.saveCategory(categoryData);
    return {
      statusCode: 201,
      message: 'Categoria criada com sucesso!',
      category: newCategory,
    };
  }

  @ApiOkResponse({ description: 'Categoria atualizada com sucesso!' })
  @ApiOperation({
    summary: 'Atualiza uma categoria',
    description:
      'Atualiza uma categoria com base no ID passado como parâmetro e dados passados no corpo da requisição...',
  })
  @Patch('/:id')
  async updateCategory(
    @Param('id') id: string,
    @Body()
    dataToUpdate: UpdateCategoryDto,
  ): Promise<{
    statusCode: number;
    message: string;
    category: ResponseCategoryDto;
  }> {
    const categoryUpdated = await this.categoriesService.updateCategory(
      id,
      dataToUpdate,
    );
    return {
      statusCode: 200,
      message: 'Categoria atualizada com sucesso!',
      category: categoryUpdated,
    };
  }

  @ApiOkResponse({
    description: 'Categoria deletada com sucesso!',
  })
  @ApiOperation({
    summary: 'Exclui uma categoria',
    description:
      'Exclui uma categoria com base no ID passado como parâmetro...',
  })
  @Delete('/:id')
  async deleteCategory(
    @Param('id') id: string,
  ): Promise<{ statusCode: number; message: string }> {
    await this.categoriesService.removeCategory(id);

    return {
      statusCode: 200,
      message: 'Categoria deletada com sucesso!',
    };
  }
}
