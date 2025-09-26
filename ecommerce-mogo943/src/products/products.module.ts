import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductRespository } from './products.repository';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ProductRespository],
})
export class ProductsModule {}
