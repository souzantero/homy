import { PrismaClient } from '@prisma/client'
import { Product } from '../../../domain/models/product'
import { AddProductRepository } from '../../../domain/repositories/add-product-repository'
import { LoadProductsRepository } from '../../../domain/repositories/load-products-repository'
import { UpdateProductByIdRepository } from '../../../domain/repositories/update-product-by-id-repository'
import { LoadProductRepository } from '../../../domain/repositories/load-product-repository'

export class ProductPrismaRepository
  implements
    AddProductRepository,
    LoadProductRepository,
    LoadProductsRepository,
    UpdateProductByIdRepository
{
  constructor(private readonly prisma: PrismaClient) {}

  loadOne(where: LoadProductRepository.Where): Promise<Product> {
    return this.prisma.product.findFirst({ where })
  }

  loadMany(
    where: LoadProductsRepository.Where
  ): Promise<LoadProductsRepository.Result> {
    return this.prisma.product.findMany({ where })
  }

  updateById(
    id: string,
    data: UpdateProductByIdRepository.Data
  ): Promise<UpdateProductByIdRepository.Result> {
    return this.prisma.product.update({
      where: { id },
      data
    })
  }

  add(product: AddProductRepository.Params): Promise<Product> {
    return this.prisma.product.create({
      data: product
    })
  }

  loadAll(): Promise<Product[]> {
    return this.prisma.product.findMany()
  }
}
