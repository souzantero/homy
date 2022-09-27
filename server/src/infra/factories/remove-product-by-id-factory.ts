import { PrismaClient } from '@prisma/client'
import { RemoveProductById } from '../../domain/usecases/remove-product-by-id'
import { makeUpdateProductById } from './update-product-by-id-factory'

export const makeRemoveProductById = (prisma: PrismaClient) => {
  const updateProductById = makeUpdateProductById(prisma)
  return new RemoveProductById(updateProductById)
}
