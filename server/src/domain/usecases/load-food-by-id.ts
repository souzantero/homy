import { Food } from "../models/food"
import { LoadFoodByIdRepository } from "../repositories/load-food-by-id-repository"

export class LoadFoodById {
  constructor(
    private readonly loadFoodByIdRepository: LoadFoodByIdRepository
  ) { }

  async load(id: string): Promise<LoadFoodById.Result> {
    const food = await this.loadFoodByIdRepository.loadOneWithSuppliesById(id)
    if (food && food.deletedAt) {
      return null
    }

    return food
  }
}

export namespace LoadFoodById {
  export type Result = Food | null
}