import { FoodSupplyModel } from "../models/food-supply"

export interface LoadFoodSuppliesRepository {
  load(): Promise<LoadFoodSuppliesRepository.Result>
}

export namespace LoadFoodSuppliesRepository {
  export type Result = FoodSupplyModel[]
}