import { CategoriesModule } from './categories/categories.module';
import { CustomersModule } from './customers/customers.module';
import { GroomingsModule } from './groomings/groomings.module';
import { ProductsModule } from './products/products.module';
import { ServicesModule } from './services/services.module';
import { PrismaModule } from './prisma/prisma.module';
import { StockModule } from './stock/stock.module';
import { PetsModule } from './pets/pets.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    PrismaModule,
    CustomersModule,
    PetsModule,
    ProductsModule,
    GroomingsModule,
    ServicesModule,
    StockModule,
    CategoriesModule,
  ],
})
export class AppModule {}

