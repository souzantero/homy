import { Food } from '../models/food'

export interface UpdateFoodByIdRepository {
  updateById(
    id: string,
    data: UpdateFoodByIdRepository.Data
  ): Promise<UpdateFoodByIdRepository.Result>
}

export namespace UpdateFoodByIdRepository {
  export type Data = Omit<Partial<Food>, 'id' | 'createdAt' | 'suppliedFoods'>
  export type Result = Food
}
