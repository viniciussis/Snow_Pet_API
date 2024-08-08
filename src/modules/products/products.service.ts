import { PrismaService } from 'src/plugins/database/services/database.service';
import { CategoriesService } from '../categories/categories.service';
import { UpdateProductDto } from './dtos/update-product.dto';
import { CreateProductDto } from './dtos/create-product.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  constructor(
    private prisma: PrismaService,
    private categoriesService: CategoriesService,
  ) {}

  async getProductById(id: string) {
    const foundProduct = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!foundProduct) {
      throw new Error('Product not found!');
    }

    return foundProduct;
  }

  async getAllProducts() {
    return await this.prisma.product.findMany({
      select: {
        id: true,
        categoryId: true,
        brand: true,
        description: true,
        measure: true,
        name: true,
        price: true,
      },
    });
  }

  async saveProduct(productData: CreateProductDto) {
    const { categoryId, ...product } = productData;
    const newProduct = await this.prisma.product.create({
      data: {
        ...product,
        category: {
          connect: {
            id: categoryId,
          },
        },
        stock: {
          create: {},
        },
      },
      select: {
        brand: true,
        description: true,
        measure: true,
        name: true,
        price: true,
        category: true,
      },
    });

    return newProduct;
  }

  async updateProduct(id: string, dataToUpdate: UpdateProductDto) {
    return await this.prisma.product.update({
      where: {
        id,
      },
      data: dataToUpdate,
      select: {
        brand: true,
        description: true,
        measure: true,
        name: true,
        price: true,
        category: true,
      },
    });
  }

  async removeProduct(id: string) {
    return await this.prisma.product.delete({
      where: {
        id,
      },
      include: {
        stock: true,
      },
    });
  }
}
