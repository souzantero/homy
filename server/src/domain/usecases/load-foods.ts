import { FoodModel } from "../models/food";
import { FoodRepository } from "../repositories/food-repository";

export class LoadFoods {
  constructor(
    private foodRepository: FoodRepository
  ) { }

  load(): Promise<LoadFoods.Result> {
    return this.foodRepository.loadAll()
  }
}

export namespace LoadFoods {
  export type Result = FoodModel[]
}