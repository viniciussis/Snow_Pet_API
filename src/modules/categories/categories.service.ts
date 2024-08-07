import { PrismaService } from 'src/plugins/database/services/database.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async getCategoryById(id: string) {
    const category = await this.prisma.category.findUnique({
      where: {
        id: id,
      },
    });

    if (!category) {
      throw new Error(`Category not found! ID: ${id}`);
    }

    return category;
  }

  async getAllCategories() {
    return await this.prisma.category.findMany({});
  }

  async saveCategory(categoryData: Prisma.CategoryCreateInput) {
    const newCategory = await this.prisma.category.create({
      data: categoryData,
    });

    return newCategory;
  }

  async updateCategory(id: string, dataToUpdate: Prisma.CategoryUpdateInput) {
    return await this.prisma.category.update({
      where: {
        id,
      },
      data: dataToUpdate,
    });
  }

  async removeCategory(id: string) {
    return await this.prisma.category.delete({
      where: {
        id,
      },
    });
  }
}
