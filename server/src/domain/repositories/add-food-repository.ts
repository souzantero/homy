import { FoodModel } from "../models/food"

export interface AddFoodRepository {
  add(food: AddFoodRepository.Params): Promise<AddFoodRepository.Result>
}

export namespace AddFoodRepository {
  export type Params = {
    id: string
    name: string
    expiresIn: number
    createdAt: Date
  }

  export type Result = FoodModel
}