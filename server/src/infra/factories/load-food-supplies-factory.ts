import { PrismaClient } from '@prisma/client'
import { LoadFoodSupplies } from '../../domain/usecases/load-food-supplies'
import { FoodSupplyPrismaRepository } from '../repositories/prisma/food-supply-prisma-repository'

export const makeLoadFoodSupplies = (prisma: PrismaClient) => {
  const repository = new FoodSupplyPrismaRepository(prisma)
  return new LoadFoodSupplies(repository)
}
