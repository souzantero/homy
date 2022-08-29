import { PrismaClient } from '@prisma/client'
import { RemoveFoodById } from '../../domain/usecases/remove-food-by-id'
import { makeUpdateFoodById } from './update-food-by-id-factory'

export const makeRemoveFoodById = (prisma: PrismaClient) => {
  const updateFoodById = makeUpdateFoodById(prisma)
  return new RemoveFoodById(updateFoodById)
}
