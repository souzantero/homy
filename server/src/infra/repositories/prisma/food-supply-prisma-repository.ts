import { PrismaClient } from "@prisma/client"
import { FoodSupplyModel } from "../../../domain/models/food-supply"
import { AddFoodSupplyRepository } from "../../../domain/repositories/add-food-supply-repository"
import { LoadFoodSuppliesRepository } from "../../../domain/repositories/load-food-supplies-repository"

export class FoodSupplyPrismaRepository implements AddFoodSupplyRepository, LoadFoodSuppliesRepository {
  constructor(
    private readonly prisma: PrismaClient
  ) { }

  add(foodSupply: AddFoodSupplyRepository.Params): Promise<FoodSupplyModel> {
    return this.prisma.foodSupply.create({
      data: {
        id: foodSupply.id,
        createdAt: foodSupply.createdAt,
        suppliedFoods: {
          create: foodSupply.suppliedFoods.map(suppliedFood => ({
            foodId: suppliedFood.foodId,
            createdAt: suppliedFood.createdAt
          }))
        }
      }
    })
  }

  load(): Promise<LoadFoodSuppliesRepository.Result> {
    return this.prisma.foodSupply.findMany()
  }
}