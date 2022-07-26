import { FoodModel } from "../../../domain/models/food";
import { AddFoodRepository } from "../../../domain/repositories/food/add-food-repository";
import { LoadFoodsRepository } from "../../../domain/repositories/food/load-foods-repository";

export class FoodMemoryRepository implements AddFoodRepository, LoadFoodsRepository {
  constructor(
    private readonly foods: FoodModel[] = []
  ) { }

  async add(food: AddFoodRepository.Params): Promise<FoodModel> {
    this.foods.push(food)
    return food
  }

  async loadAll(): Promise<LoadFoodsRepository.Result> {
    return this.foods
  }
}