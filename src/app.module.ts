import { CategoriesModule } from './modules/categories/categories.module';
import { CustomersModule } from './modules/customers/customers.module';
import { GroomingsModule } from './modules/groomings/groomings.module';
import { ServicesModule } from './modules/services/services.module';
import { ProductsModule } from './modules/products/products.module';
import { PrismaModule } from './plugins/database/database.module';
import { StockModule } from './modules/stock/stock.module';
import { PetsModule } from './modules/pets/pets.module';
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

