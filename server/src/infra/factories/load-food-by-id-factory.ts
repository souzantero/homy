import { PrismaClient } from "@prisma/client"
import { LoadFoodById } from "../../domain/usecases/load-food-by-id"
import { FoodPrismaRepository } from "../repositories/prisma/food-prisma-repository"

export const makeLoadFoodById = (prisma: PrismaClient) => {
  const foodRepository = new FoodPrismaRepository(prisma)
  return new LoadFoodById(foodRepository)
}