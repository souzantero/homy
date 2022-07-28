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

  async add(data: AddFoodSupply.Params): Promise<AddFoodSupply.Result> {
    const foods = await this.loadFoodsRepository.loadAll()

    if (!data.some(item => foods.some(food => food.id === item.foodId))) {
      throw new Error('some food not exit')
    }

    const id = this.identifier.identify()
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
