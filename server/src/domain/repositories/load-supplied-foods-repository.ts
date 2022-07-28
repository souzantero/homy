import { SuppliedFoodModel } from "../models/supplied-food"

export interface LoadSuppliedFoodsRepository {
  loadManyByFoodSupplyId(foodSupplyId: string): Promise<LoadSuppliedFoodsRepository.Result>
}

export namespace LoadSuppliedFoodsRepository {
  export type Result = SuppliedFoodModel[]
}