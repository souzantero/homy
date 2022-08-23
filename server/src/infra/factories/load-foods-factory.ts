import { PrismaClient } from '@prisma/client'
import { LoadFoods } from '../../domain/usecases/load-foods'
import { FoodPrismaRepository } from '../repositories/prisma/food-prisma-repository'

export const makeLoadFoods = (prisma: PrismaClient) => {
  const foodRepository = new FoodPrismaRepository(prisma)
  return new LoadFoods(foodRepository)
}
