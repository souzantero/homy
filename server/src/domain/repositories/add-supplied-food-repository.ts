import { SuppliedFoodModel } from "../models/supplied-food"

export interface AddSuppliedFoodRepository {
  add(suppliedFood: AddSuppliedFoodRepository.Params): Promise<AddSuppliedFoodRepository.Result>
}

export namespace AddSuppliedFoodRepository {
  export type Params = Omit<SuppliedFoodModel, 'foodSupply' | 'food' | 'updatedAt' | 'deletedAt'>
  export type Result = SuppliedFoodModel
}