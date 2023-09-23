import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { ProductImage } from './entities/product-image.entity';
import { CategoryController } from './controllers/categories.controller';
import { CategoryService } from './services/categories.service';
import { Category } from './entities/category.entity';
import { Proveedor } from './entities/proveedor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductImage, Category,Proveedor])],
  controllers: [ProductController, CategoryController],
  providers: [ProductsService, CategoryService],
})
export class ProductsModule {}
