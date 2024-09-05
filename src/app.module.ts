import { CategoriesModule } from './petshop/categories/categories.module';
import { CustomersModule } from './petshop/customers/customers.module';
import { GroomingsModule } from './petshop/groomings/groomings.module';
import { ServicesModule } from './petshop/services/services.module';
import { ProductsModule } from './petshop/products/products.module';
import { PrismaModule } from './plugins/database/database.module';
import { StockModule } from './petshop/stock/stock.module';
import { PetsModule } from './petshop/pets/pets.module';
import { UsersModule } from './core/users/users.module';
import { AuthModule } from './core/auth/auth.module';
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
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}

