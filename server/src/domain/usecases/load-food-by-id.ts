import { Food } from '../models/food'
import { LoadFoodRepository } from '../repositories/load-food-repository'

export class LoadFoodById {
  constructor(private readonly loadFoodRepository: LoadFoodRepository) {}

  async load(id: string): Promise<LoadFoodById.Result> {
    const where: LoadFoodRepository.Where = {
      id,
      deletedAt: null
    }

    return this.loadFoodRepository.loadOneWithSupplies(where)
  }
}

export namespace LoadFoodById {
  export type Result = Food | null
}
