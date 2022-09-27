import { PrismaClient } from '@prisma/client'
import { UpdateProductById } from '../../domain/usecases/update-product-by-id'
import { ProductPrismaRepository } from '../repositories/prisma/product-prisma-repository'
import { makeLoadProductById } from './load-product-by-id-factory'

export const makeUpdateProductById = (prisma: PrismaClient) => {
  const loadProductById = makeLoadProductById(prisma)
  const productRepository = new ProductPrismaRepository(prisma)

  return new UpdateProductById(loadProductById, productRepository)
}
