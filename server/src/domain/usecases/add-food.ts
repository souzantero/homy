import { Food } from '../models/food'
import { Identifier } from '../protocols/identifier'
import { AddFoodRepository } from '../repositories/add-food-repository'

export class AddFood {
  constructor(
    private readonly identifier: Identifier,
    private readonly foodRepository: AddFoodRepository
  ) {}

  async add(data: AddFood.Params): Promise<AddFood.Result> {
    const { name, expiresIn } = data
    const id = this.identifier.identify()
    const createdAt = new Date()

    return this.foodRepository.add({ id, name, expiresIn, createdAt })
  }
}

export namespace AddFood {
  export type Params = {
    name: string
    expiresIn: number
  }

  export type Result = Food
}
