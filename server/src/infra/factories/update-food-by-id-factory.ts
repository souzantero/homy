import { PrismaClient } from '@prisma/client'
import { UpdateFoodById } from '../../domain/usecases/update-food-by-id'
import { FoodPrismaRepository } from '../repositories/prisma/food-prisma-repository'
import { makeLoadFoodById } from './load-food-by-id-factory'

export const makeUpdateFoodById = (prisma: PrismaClient) => {
  const loadFoodById = makeLoadFoodById(prisma)
  const updateFoodByIdRepository = new FoodPrismaRepository(prisma)

  return new UpdateFoodById(loadFoodById, updateFoodByIdRepository)
}
