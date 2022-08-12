import { PrismaClient } from "@prisma/client";
import { UpdateFoodById } from "../../domain/usecases/update-food-by-id";
import { FoodPrismaRepository } from "../repositories/prisma/food-prisma-repository";

export const makeUpdateFoodById = (prisma: PrismaClient) => {
  const updateFoodByIdRepository = new FoodPrismaRepository(prisma)
  return new UpdateFoodById(updateFoodByIdRepository)
}