import { FoodNotFoundError } from "../errors/food-not-found-error";
import { FoodSupplyModel } from "../models/food-supply";
import { Identifier } from "../protocols/identifier";
import { AddFoodSupplyRepository } from "../repositories/add-food-supply-repository";
import { LoadFoodsRepository } from "../repositories/load-foods-repository";

export class AddFoodSupply {
  constructor(
    private readonly identifier: Identifier,
    private readonly addFoodSupplyRepository: AddFoodSupplyRepository,
    private readonly loadFoodsRepository: LoadFoodsRepository
  ) { }

  async add(suppliedFoods: AddFoodSupply.Params): Promise<AddFoodSupply.Result> {
    const foods = await this.loadFoodsRepository.loadAll()
    const foodIds = foods.map(food => food.id)

    for (const suppliedFood of suppliedFoods) {
      if (!foodIds.includes(suppliedFood.foodId)) {
        throw new FoodNotFoundError(suppliedFood.foodId)
      }
    }

    const id = this.identifier.identify()
    const createdAt = new Date()

    return this.addFoodSupplyRepository.add({
      id,
      createdAt,
      suppliedFoods: suppliedFoods.map(suppliedFood => ({
        ...suppliedFood,
        createdAt: new Date()
      }))
    })
  }
}

export namespace AddFoodSupply {
  export type Params = { foodId: string }[]
  export type Result = FoodSupplyModel
}
