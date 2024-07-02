import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

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
    return await this.prisma.product.findMany({});
  }

  async saveProduct(productData: Prisma.ProductCreateInput) {
    const newProduct = await this.prisma.product.create({
      data: productData,
    });

    return newProduct;
  }

  async updateProduct(id: string, dataToUpdate: Prisma.ProductUpdateInput) {
    return await this.prisma.product.update({
      where: {
        id,
      },
      data: dataToUpdate,
    });
  }

  async removeProduct(id: string) {
    return await this.prisma.product.delete({
      where: {
        id,
      },
    });
  }
}
