import { FoodRepository } from "../food-repository";
import { FoodModel } from "../models/food";

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