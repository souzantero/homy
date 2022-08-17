import { PrismaClient } from "@prisma/client"
import { AddFoodSupply } from "../../domain/usecases/add-food-supply"
import { AddFoodSupplyValidator } from "../../domain/validators/add-food-supply-validator"
import { FoodSupplyPrismaRepository } from "../repositories/prisma/food-supply-prisma-repository"
import { UuidAdapter } from "../adapters/uuid-adapter"
import { makeLoadFoods } from "./load-foods-factory"

export const makeAddFoodSupply = (prisma: PrismaClient) => {
  const identifier = new UuidAdapter()
  const foodSupplyRepository = new FoodSupplyPrismaRepository(prisma)
  const loadFoods = makeLoadFoods(prisma)
  const validator = new AddFoodSupplyValidator(loadFoods)
  return new AddFoodSupply(identifier, foodSupplyRepository, validator)
}