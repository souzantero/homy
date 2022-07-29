import { Food } from "../models/food"
import { AddFoodRepository } from "../repositories/add-food-repository"

export class AddFood {
  constructor(
    private readonly addFoodRepository: AddFoodRepository
  ) { }

  add(params: AddFood.Params): Promise<Food> {
    return this.addFoodRepository.add(params)
  }
}

export namespace AddFood {
  export type Params = AddFoodRepository.Params
}