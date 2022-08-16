import { Food } from "../models/food"

export interface LoadFoodRepository {
  loadOneWithSupplies(where: LoadFoodRepository.Where): Promise<LoadFoodRepository.Result>
}

export namespace LoadFoodRepository {
  export type Where = Omit<Partial<Food>, 'suppliedFoods'>
  export type Result = Food | null
}