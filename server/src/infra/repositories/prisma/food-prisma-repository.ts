import { PrismaClient } from '@prisma/client';
import { AddFoodRepository } from '../../../domain/repositories/add-food-repository';
import { Food } from "../../../domain/models/food";
import { LoadFoodsRepository } from "../../../domain/repositories/load-foods-repository";

export class FoodPrismaRepository implements AddFoodRepository, LoadFoodsRepository {
  constructor(
    private readonly prismaClient: PrismaClient
  ) { }

  add(food: AddFoodRepository.Params): Promise<Food> {
    return this.prismaClient.food.create({
      data: food
    })
  }

  loadAll(): Promise<Food[]> {
    return this.prismaClient.food.findMany()
  }
}