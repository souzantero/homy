import { UpdateFoodRepository } from "../repositories/update-food-repository"

export class UpdateFoodByIdService {
  constructor(
    private readonly updateFoodRepository: UpdateFoodRepository
  ) { }

  update(id: string, data: UpdateFoodByIdService.Data): Promise<UpdateFoodByIdService.Result> {
    return this.updateFoodRepository.updateById(id, data)
  }
}

export namespace UpdateFoodByIdService {
  export type Data = UpdateFoodRepository.Data
  export type Result = UpdateFoodRepository.Result
}