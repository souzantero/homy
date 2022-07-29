import { Food } from "../../domain/models/food";
import { AddFoodRepository } from "../../domain/repositories/add-food-repository";
import { FoodRepository } from "../../domain/repositories/food-repository";

export class FoodMemoryRepository implements FoodRepository {
  constructor(
    private readonly foods: Food[]
  ) { }

  async add(params: AddFoodRepository.Params): Promise<Food> {
    return new Promise((resolve) => {
      setTimeout(async () => {
        const food: Food = { id: Date.now().toString(), createdAt: new Date(), ...params }
        this.foods.push(food)
        resolve(food)
      }, 1000)
    })
  }

  async loadAll(): Promise<Food[]> {
    return this.foods
  }
}