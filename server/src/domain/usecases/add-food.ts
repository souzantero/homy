import { FoodModel } from "../models/food";
import { Identifier } from "../protocols/identifier";
import { AddFoodRepository } from "../repositories/add-food-repository";

export class AddFood {
  constructor(
    private readonly identifier: Identifier,
    private readonly foodRepository: AddFoodRepository
  ) { }

  async add(data: AddFood.Params): Promise<AddFood.Result> {
    const { name } = data
    const id = await this.identifier.identify()
    const createdAt = new Date()

    return this.foodRepository.add({ id, name, createdAt })
  }
}

export namespace AddFood {
  export type Params = Omit<FoodModel, 'id' | 'createdAt'>
  export type Result = FoodModel
}
