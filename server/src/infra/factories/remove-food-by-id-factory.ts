import { PrismaClient } from '@prisma/client'
import { RemoveFoodById } from '../../domain/usecases/remove-food-by-id'
import { FoodPrismaRepository } from '../repositories/prisma/food-prisma-repository'
import { makeLoadFoodById } from './load-food-by-id-factory'

export const makeRemoveFoodById = (prisma: PrismaClient) => {
  const loadFoodById = makeLoadFoodById(prisma)
  const removeFoodByIdRepository = new FoodPrismaRepository(prisma)
  return new RemoveFoodById(loadFoodById, removeFoodByIdRepository)
}
