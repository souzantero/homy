import { PrismaClient } from '@prisma/client'
import { AddFood } from '../../domain/usecases/add-food'
import { FoodPrismaRepository } from '../repositories/prisma/food-prisma-repository'
import { UuidAdapter } from '../adapters/uuid-adapter'

export const makeAddFood = (prisma: PrismaClient) => {
  const uuidAdapter = new UuidAdapter()
  const foodRepository = new FoodPrismaRepository(prisma)
  return new AddFood(uuidAdapter, foodRepository)
}
