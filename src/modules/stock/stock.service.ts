import { PrismaService } from 'src/plugins/database/services/database.service';
import { UpdateStockDto } from './dtos/update-stock.dto';
import { Injectable } from '@nestjs/common';

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
      select: {
        productId: true,
        date: true,
        quantity: true,
        id: true,
      },
    });
  }

  async updateStock(id: string, dataToUpdate: UpdateStockDto) {
    return await this.prisma.stock.update({
      where: {
        id,
      },
      data: dataToUpdate,
      select: {
        productId: true,
        date: true,
        quantity: true,
        id: true,
      },
    });
  }
}
