import { FoodModel } from "../models/food";
import { AddFoodRepository } from "../repositories/food/add-food-repository";

export class AddFood {
  constructor(
    private readonly foodRepository: AddFoodRepository
  ) { }

  add(data: AddFood.Params): Promise<AddFood.Result> {
    const id = Date.now().toString()
    const { name } = data
    return this.foodRepository.add({ id, name })
  }
}

export namespace AddFood {
  export type Params = Omit<FoodModel, 'id'>
  export type Result = FoodModel
}
