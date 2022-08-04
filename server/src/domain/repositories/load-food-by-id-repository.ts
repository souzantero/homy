import { Food } from "../models/food"

export interface LoadFoodByIdRepository {
  loadOneWithSupplies(where: LoadFoodByIdRepository.Where): Promise<LoadFoodByIdRepository.Result>
}

export namespace LoadFoodByIdRepository {
  export type Where = Omit<Partial<Food>, 'suppliedFoods'>
  export type Result = Food | null
}