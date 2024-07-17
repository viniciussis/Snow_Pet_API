import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { Prisma } from '@prisma/client';

@ApiTags('Categories')
@Controller('v1/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiOkResponse({ description: 'All the categories got successfully...' })
  async getAllCategories() {
    const allCategories = await this.categoriesService.getAllCategories();
    return allCategories;
  }

  @Get('/:id')
  @ApiOkResponse({ description: 'Category got successfully...' })
  async getCategory(@Param('id') id: string) {
    const category = await this.categoriesService.getCategoryById(id);
    return category;
  }

  @Post()
  @ApiCreatedResponse({ description: 'Category created successfully...' })
  async createCategory(
    @Body()
    categoryData: Prisma.CategoryCreateInput,
  ) {
    const newCategory = await this.categoriesService.saveCategory(categoryData);
    return newCategory;
  }

  @Patch('/:id')
  @ApiOkResponse({ description: 'Category created successfully...' })
  async updateCategory(
    @Param('id') id: string,
    @Body()
    dataToUpdate: Prisma.CategoryUpdateInput,
  ) {
    const categoryUpdated = await this.categoriesService.updateCategory(
      id,
      dataToUpdate,
    );
    return {
      message: 'Category successfully updated...',
      category: categoryUpdated,
    };
  }

  @Delete('/:id')
  @ApiNoContentResponse({ description: 'Category deleted successfully...' })
  async deleteCategory(@Param('id') id: string) {
    const categoryDeleted = await this.categoriesService.removeCategory(id);

    return {
      message: 'Category deleted successfully...',
      category: categoryDeleted,
    };
  }
}
