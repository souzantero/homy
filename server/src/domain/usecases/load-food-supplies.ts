import { FoodSupplyModel } from "../models/food-supply"
import { LoadFoodSuppliesRepository } from "../repositories/load-food-supplies-repository"

export class LoadFoodSupplies {
  constructor(
    private loadFoodSuppliesRepository: LoadFoodSuppliesRepository
  ) { }

  load(): Promise<LoadFoods.Result> {
    return this.loadFoodSuppliesRepository.load()
  }
}

export namespace LoadFoods {
  export type Result = FoodSupplyModel[]
}