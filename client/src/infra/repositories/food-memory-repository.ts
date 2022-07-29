import { Food } from "../../domain/models/food";
import { FoodRepository } from "../../domain/repositories/food-repository";

export class FoodMemoryRepository implements FoodRepository {
  constructor(
    private readonly foods: Food[]
  ) { }

  async findAll(): Promise<Food[]> {
    return this.foods
  }
}