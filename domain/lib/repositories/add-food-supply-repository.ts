import { FoodSupply } from "../models/food-supply"

export interface AddFoodSupplyRepository {
  add(foodSupply: AddFoodSupplyRepository.Params): Promise<AddFoodSupplyRepository.Result>
}

export namespace AddFoodSupplyRepository {
  export type Params = {
    id: string
    createdAt: Date
    suppliedFoods: { foodId: string, createdAt: Date }[]
  }

  export type Result = FoodSupply
}