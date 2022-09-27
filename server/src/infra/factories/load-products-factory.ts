import { PrismaClient } from '@prisma/client'
import { LoadProducts } from '../../domain/usecases/load-products'
import { ProductPrismaRepository } from '../repositories/prisma/product-prisma-repository'

export const makeLoadProducts = (prisma: PrismaClient) => {
  const productRepository = new ProductPrismaRepository(prisma)
  return new LoadProducts(productRepository)
}
