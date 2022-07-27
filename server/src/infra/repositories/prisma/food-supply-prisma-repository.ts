import { PrismaClient } from "@prisma/client"
import { FoodSupplyModel } from "../../../domain/models/food-supply"
import { AddFoodSupplyRepository } from "../../../domain/repositories/add-food-supply-repository"

export class FoodSupplyPrismaRepository implements AddFoodSupplyRepository {
  constructor(
    private readonly prismaClient: PrismaClient
  ) { }

  add(foodSupply: AddFoodSupplyRepository.Params): Promise<FoodSupplyModel> {
    return this.prismaClient.foodSupply.create({
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
}