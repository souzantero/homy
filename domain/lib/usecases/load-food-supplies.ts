import { FoodSupply } from "../models/food-supply"

export interface LoadFoodSupplies {
  load(): Promise<LoadFoods.Result>
}

export namespace LoadFoods {
  export type Result = FoodSupply[]
}