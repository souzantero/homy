import { FoodSupplyModel } from "../models/food-supply"

export interface LoadFoodSuppliesRepository {
  loadAll(): Promise<LoadFoodSuppliesRepository.Result>
}

export namespace LoadFoodSuppliesRepository {
  export type Result = FoodSupplyModel[]
}