import { PrismaClient } from "@prisma/client";
import { RemoveFoodById } from "../../domain/usecases/remove-food-by-id";
import { FoodPrismaRepository } from "../repositories/prisma/food-prisma-repository";

export const makeRemoveFoodById = (primsa: PrismaClient) => {
  const removeFoodByIdRepository = new FoodPrismaRepository(primsa)
  return new RemoveFoodById(removeFoodByIdRepository)
}