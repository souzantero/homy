import { PrismaClient } from '@prisma/client'
import { LoadSuppliedFoods } from '../../domain/usecases/load-supplied-foods'
import { SuppliedFoodPrismaRepository } from '../repositories/prisma/supplied-food-prisma-repository'

export const makeLoadSuppliedFoods = (prisma: PrismaClient) => {
  const loadSuppliedFoodsRepository = new SuppliedFoodPrismaRepository(prisma)
  return new LoadSuppliedFoods(loadSuppliedFoodsRepository)
}
