import { FoodSupply } from "../models/food-supply"

export interface AddFoodSupply {
  add(suppliedFoods: AddFoodSupply.Params): Promise<AddFoodSupply.Result>
}

export namespace AddFoodSupply {
  export type Params = { foodId: string }[]
  export type Result = FoodSupply
}
