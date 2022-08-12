import { Food } from "../models/food"

export interface UpdateFoodRepository {
  updateById(id: string, data: UpdateFoodRepository.Data): Promise<UpdateFoodRepository.Result>
}
export namespace UpdateFoodRepository {
  export type Data = {
    name: string
    expiresIn: number
  }

  export type Result = Food
}
