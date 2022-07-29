import { Food } from "../../domain/models/food";
import { FoodRepository } from "../../domain/repositories/food-repository";

export class FoodMemoryRepository implements FoodRepository {
  constructor(
    private readonly foods: Food[]
  ) { }

  async loadAll(): Promise<Food[]> {
    return this.foods
  }
}