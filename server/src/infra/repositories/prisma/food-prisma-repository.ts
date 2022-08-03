import { PrismaClient } from '@prisma/client';
import { AddFoodRepository } from '../../../domain/repositories/add-food-repository';
import { Food } from "../../../domain/models/food";
import { LoadFoodsRepository } from "../../../domain/repositories/load-foods-repository";
import { UpdateFoodByIdRepository } from '../../../domain/repositories/update-food-by-id-repository';

export class FoodPrismaRepository implements AddFoodRepository, LoadFoodsRepository, UpdateFoodByIdRepository {
  constructor(
    private readonly prisma: PrismaClient
  ) { }

  updateById(id: string, data: UpdateFoodByIdRepository.Data): Promise<UpdateFoodByIdRepository.Data> {
    return this.prisma.food.update({
      where: { id },
      data
    })
  }

  add(food: AddFoodRepository.Params): Promise<Food> {
    return this.prisma.food.create({
      data: food
    })
  }

  loadAll(): Promise<Food[]> {
    return this.prisma.food.findMany()
  }
}