import { Food } from "../models/food";

export interface AddFoodRepository {
  add(params: AddFoodRepository.Params): Promise<AddFoodRepository.Result>
}
export namespace AddFoodRepository {
  export type Params = {
    name: String
    expiresIn: Number
  }

  export type Result = Food
}
