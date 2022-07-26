import { FoodModel } from "../models/food";
import { AddFoodRepository } from "../repositories/food/add-food-repository";

export class AddFood {
  constructor(
    private readonly foodRepository: AddFoodRepository
  ) { }

  add(data: AddFood.Params): Promise<AddFood.Result> {
    const { name } = data
    const id = Date.now().toString()
    const createdAt = new Date()

    return this.foodRepository.add({ id, name, createdAt })
  }
}

export namespace AddFood {
  export type Params = Omit<FoodModel, 'id' | 'createdAt'>
  export type Result = FoodModel
}
