import { PrismaClient } from '@prisma/client'
import { LoadProductById } from '../../domain/usecases/load-product-by-id'
import { ProductPrismaRepository } from '../repositories/prisma/product-prisma-repository'

export const makeLoadProductById = (prisma: PrismaClient) => {
  const productRepository = new ProductPrismaRepository(prisma)
  return new LoadProductById(productRepository)
}
