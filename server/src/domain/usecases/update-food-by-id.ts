import { Food } from "../models/food";
import { UpdateFoodByIdRepository } from "../repositories/update-food-by-id-repository";

export class UpdateFoodById {
  constructor(
    private readonly updateFoodByIdRepository: UpdateFoodByIdRepository
  ) { }

  async updateById(id: string, data: UpdateFoodById.Data): Promise<UpdateFoodById.Result> {
    return this.updateFoodByIdRepository.updateById(id, {
      ...data,
      updatedAt: new Date()
    })
  }
}

export namespace UpdateFoodById {
  export type Data = Omit<UpdateFoodByIdRepository.Data, 'updatedAt' | 'deletedAt'>
  export type Result = Food
}