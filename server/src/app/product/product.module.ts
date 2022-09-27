import { Module } from '@nestjs/common'
import { AddProduct } from '../../domain/usecases/add-product'
import { LoadProducts } from '../../domain/usecases/load-products'
import { RemoveProductById } from '../../domain/usecases/remove-product-by-id'
import { LoadProductById } from '../../domain/usecases/load-product-by-id'
import { UpdateProductById } from '../../domain/usecases/update-product-by-id'
import { PrismaModule } from '../shared/prisma/prisma.module'
import { PrismaService } from '../shared/prisma/prisma.service'
import { ProductController } from './product.controller'
import { makeAddProduct } from '../../infra/factories/add-product-factory'
import { makeLoadProducts } from '../../infra/factories/load-products-factory'
import { makeRemoveProductById } from '../../infra/factories/remove-product-by-id-factory'
import { makeLoadProductById } from '../../infra/factories/load-product-by-id-factory'
import { makeUpdateProductById } from '../../infra/factories/update-product-by-id-factory'

@Module({
  imports: [PrismaModule],
  controllers: [ProductController],
  providers: [
    {
      provide: LoadProducts,
      inject: [PrismaService],
      useFactory: makeLoadProducts
    },
    {
      provide: AddProduct,
      inject: [PrismaService],
      useFactory: makeAddProduct
    },
    {
      provide: RemoveProductById,
      inject: [PrismaService],
      useFactory: makeRemoveProductById
    },
    {
      provide: LoadProductById,
      inject: [PrismaService],
      useFactory: makeLoadProductById
    },
    {
      provide: UpdateProductById,
      inject: [PrismaService],
      useFactory: makeUpdateProductById
    }
  ]
})
export class ProductModule {}
