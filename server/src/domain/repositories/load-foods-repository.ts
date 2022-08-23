import { Food } from '../models/food'

export interface LoadFoodsRepository {
  loadAll(): Promise<LoadFoodsRepository.Result>
  loadMany(
    where: LoadFoodsRepository.Where
  ): Promise<LoadFoodsRepository.Result>
}

export namespace LoadFoodsRepository {
  export type Where = Omit<Partial<Food>, 'suppliedFoods'>
  export type Result = Food[]
}
