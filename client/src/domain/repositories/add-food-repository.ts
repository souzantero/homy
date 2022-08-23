import { Food } from '../models/food'

export interface AddFoodRepository {
  add(params: AddFoodRepository.Params): Promise<AddFoodRepository.Result>
}
export namespace AddFoodRepository {
  export type Params = {
    name: string
    expiresIn: number
  }

  export type Result = Food
}
