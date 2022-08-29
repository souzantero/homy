import { FoodNotFoundError } from '../errors/food-not-found-error'
import { Food } from '../models/food'
import { UpdateFoodByIdRepository } from '../repositories/update-food-by-id-repository'
import { LoadFoodById } from './load-food-by-id'

export class UpdateFoodById {
  constructor(
    private readonly loadFoodById: LoadFoodById,
    private readonly updateFoodByIdRepository: UpdateFoodByIdRepository
  ) {}

  async updateById(
    id: string,
    data: UpdateFoodById.Data
  ): Promise<UpdateFoodById.Result> {
    const food = await this.loadFoodById.load(id)
    if (!food) {
      throw new FoodNotFoundError(id)
    }

    return this.updateFoodByIdRepository.updateById(id, {
      ...data,
      updatedAt: new Date()
    })
  }
}

export namespace UpdateFoodById {
  export type Data = Omit<UpdateFoodByIdRepository.Data, 'updatedAt'>
  export type Result = Food
}
