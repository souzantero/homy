import { PrismaClient } from '@prisma/client';
import { AddFoodRepository } from '../../../domain/repositories/add-food-repository';
import { Food } from "../../../domain/models/food";
import { LoadFoodsRepository } from "../../../domain/repositories/load-foods-repository";
import { UpdateFoodByIdRepository } from '../../../domain/repositories/update-food-by-id-repository';
import { LoadFoodByIdRepository } from '../../../domain/repositories/load-food-by-id-repository';

export class FoodPrismaRepository implements AddFoodRepository, LoadFoodByIdRepository, LoadFoodsRepository, UpdateFoodByIdRepository {
  constructor(
    private readonly prisma: PrismaClient
  ) { }

  loadOneWithSupplies(where: LoadFoodByIdRepository.Where): Promise<Food> {
    return this.prisma.food.findFirst({
      where,
      include: {
        suppliedFoods: true
      }
    })
  }

  loadMany(where: LoadFoodsRepository.Where): Promise<LoadFoodsRepository.Result> {
    return this.prisma.food.findMany({ where })
  }

  updateById(id: string, data: UpdateFoodByIdRepository.Data): Promise<UpdateFoodByIdRepository.Result> {
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