import { FoodModel } from "../../../domain/models/food"

export interface AddFoodRepository {
  add(food: AddFoodRepository.Params): Promise<AddFoodRepository.Result>
}

export namespace AddFoodRepository {
  export type Params = {
    id: string,
    name: string
  }

  export type Result = FoodModel
}