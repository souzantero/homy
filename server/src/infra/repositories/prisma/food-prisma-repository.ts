import { PrismaClient } from '@prisma/client';
import { AddFoodRepository } from '../../../domain/repositories/food/add-food-repository';
import { FoodModel } from "../../../domain/models/food";
import { LoadFoodsRepository } from "../../../domain/repositories/food/load-foods-repository";

export class FoodPrismaRepository implements AddFoodRepository, LoadFoodsRepository {
  constructor(
    private readonly prismaClient: PrismaClient
  ) { }

  add(food: AddFoodRepository.Params): Promise<FoodModel> {
    return this.prismaClient.food.create({
      data: food
    })
  }

  loadAll(): Promise<FoodModel[]> {
    return this.prismaClient.food.findMany()
  }
}