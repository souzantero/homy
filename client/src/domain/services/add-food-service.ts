import { AddFoodRepository } from "../repositories/add-food-repository"

export class AddFoodService {
  constructor(
    private readonly addFoodRepository: AddFoodRepository
  ) { }

  add(params: AddFoodService.Params): Promise<AddFoodService.Result> {
    return this.addFoodRepository.add(params)
  }
}

export namespace AddFoodService {
  export type Params = AddFoodRepository.Params
  export type Result = AddFoodRepository.Result
}