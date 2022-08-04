import { Food } from "../models/food"

export interface LoadFoodByIdRepository {
  loadOneWithSuppliesById(id: string): Promise<LoadFoodByIdRepository.Result>
}

export namespace LoadFoodByIdRepository {
  export type Result = Food | null
}