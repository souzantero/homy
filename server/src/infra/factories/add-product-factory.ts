import { PrismaClient } from '@prisma/client'
import { AddProduct } from '../../domain/usecases/add-product'
import { ProductPrismaRepository } from '../repositories/prisma/product-prisma-repository'
import { UuidAdapter } from '../adapters/uuid-adapter'

export const makeAddProduct = (prisma: PrismaClient) => {
  const uuidAdapter = new UuidAdapter()
  const productRepository = new ProductPrismaRepository(prisma)
  return new AddProduct(uuidAdapter, productRepository)
}
