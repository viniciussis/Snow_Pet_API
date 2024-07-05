import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateProductDto } from './dtos/update-product.dto';
import { CreateProductDto } from './dtos/create-product.dto';

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

  async saveProduct(productData: CreateProductDto) {
    console.log(productData);
    const newProduct = await this.prisma.product.create({
      data: {
        ...productData,
        category: {
          connect: {
            id: productData.categotyId,
          },
        },
      },
    });

    return newProduct;
  }

  async updateProduct(id: string, dataToUpdate: UpdateProductDto) {
    console.log(dataToUpdate);
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
