import { FoodSupplyModel } from "../models/food-supply";
import { Identifier } from "../protocols/identifier";
import { AddFoodSupplyRepository } from "../repositories/add-food-supply-repository";

export class AddFoodSupply {
  constructor(
    private readonly identifier: Identifier,
    private readonly addFoodSupplyRepository: AddFoodSupplyRepository,
  ) { }

  async add(data: AddFoodSupply.Params): Promise<AddFoodSupply.Result> {
    const id = await this.identifier.identify()
    const createdAt = new Date()
    const suppliedFoods = data.map(item => ({
      foodId: item.foodId,
      createdAt: new Date()
    }))

    return this.addFoodSupplyRepository.add({ id, createdAt, suppliedFoods })
  }
}

export namespace AddFoodSupply {
  export type Params = { foodId: string }[]
  export type Result = FoodSupplyModel
}
