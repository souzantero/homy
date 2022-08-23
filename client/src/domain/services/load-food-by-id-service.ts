import { Food } from '../models/food'
import { LoadFoodByIdRepository } from '../repositories/load-food-by-id-repository'

export class LoadFoodByIdService {
  constructor(
    private readonly loadFoodByIdRepository: LoadFoodByIdRepository
  ) {}

  load(id: string): Promise<LoadFoodByIdService.Result> {
    return this.loadFoodByIdRepository.loadOneById(id)
  }
}

export namespace LoadFoodByIdService {
  export type Result = Food
}
