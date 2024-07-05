import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StockService {
  constructor(private prisma: PrismaService) {}

  async getStockById(id: string) {
    const foundStock = await this.prisma.stock.findUnique({
      where: { id: id },
      include: {
        product: true,
      },
    });

    if (!foundStock) {
      throw new Error('Stock not found!');
    }

    return foundStock;
  }

  async getAllStockProducts() {
    return await this.prisma.stock.findMany({
      include: {
        product: true,
      },
    });
  }

  async updateStock(id: string, dataToUpdate: Prisma.StockUpdateInput) {
    return await this.prisma.stock.update({
      where: {
        id,
      },
      data: dataToUpdate,
      include: {
        product: true
      }
    });
  }

  async removeStock(id: string) {
    return await this.prisma.stock.delete({
      where: {
        id,
      },
      include: {
        product: true,
      },
    });
  }
}
