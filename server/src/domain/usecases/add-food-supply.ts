import { FoodSupply } from "../models/food-supply";
import { Identifier } from "../protocols/identifier";
import { AddFoodSupplyRepository } from "../repositories/add-food-supply-repository";
import { AddFoodSupplyValidator } from "../validators/add-food-supply-validator";

export class AddFoodSupply {
  constructor(
    private readonly identifier: Identifier,
    private readonly addFoodSupplyRepository: AddFoodSupplyRepository,
    private readonly addFoodSupplyValidator: AddFoodSupplyValidator
  ) { }

  async add(suppliedFoods: AddFoodSupply.Params): Promise<AddFoodSupply.Result> {
    await this.addFoodSupplyValidator.validate(suppliedFoods)

    const id = this.identifier.identify()
    const createdAt = new Date()

    return this.addFoodSupplyRepository.add({
      id,
      createdAt,
      suppliedFoods: suppliedFoods.map(suppliedFood => ({
        ...suppliedFood,
        createdAt
      }))
    })
  }
}

export namespace AddFoodSupply {
  export type Params = { foodId: string }[]
  export type Result = FoodSupply
}
