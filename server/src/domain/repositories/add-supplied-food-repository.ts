import { SuppliedFood } from '../models/supplied-food'

export interface AddSuppliedFoodRepository {
  add(
    suppliedFood: AddSuppliedFoodRepository.Params
  ): Promise<AddSuppliedFoodRepository.Result>
}

export namespace AddSuppliedFoodRepository {
  export type Params = Omit<
    SuppliedFood,
    'foodSupply' | 'food' | 'updatedAt' | 'deletedAt'
  >
  export type Result = SuppliedFood
}
