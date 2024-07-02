import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CustomersModule } from './customers/customers.module';
import { PetsModule } from './pets/pets.module';
import { ProductsModule } from './products/products.module';
import { GroomingsModule } from './groomings/groomings.module';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [PrismaModule , CustomersModule, PetsModule, ProductsModule, GroomingsModule, ServicesModule],
})
export class AppModule {}

