import { Food } from "../models/food"
import { LoadFoodByIdRepository } from "../repositories/load-food-by-id-repository"

export class LoadFoodById {
  constructor(
    private readonly loadFoodByIdRepository: LoadFoodByIdRepository
  ) { }

  async load(id: string): Promise<LoadFoodById.Result> {
    const where: LoadFoodByIdRepository.Where = {
      id,
      deletedAt: null
    }

    return this.loadFoodByIdRepository.loadOneWithSupplies(where)
  }
}

export namespace LoadFoodById {
  export type Result = Food | null
}