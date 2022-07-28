import { FoodSupplyModel } from "../../../domain/models/food-supply";
import { AddFoodSupplyRepository } from "../../../domain/repositories/add-food-supply-repository";
import { LoadFoodSuppliesRepository } from "../../../domain/repositories/load-food-supplies-repository";

export class FoodSupplyMemoryRepository implements AddFoodSupplyRepository, LoadFoodSuppliesRepository {
  constructor(
    private readonly foodSupplies: FoodSupplyModel[] = []
  ) { }

  async add(foodSupplyParams: AddFoodSupplyRepository.Params): Promise<FoodSupplyModel> {
    const foodSupply = { id: foodSupplyParams.id, createdAt: foodSupplyParams.createdAt }
    this.foodSupplies.push(foodSupply)
    return foodSupply
  }

  async load(): Promise<LoadFoodSuppliesRepository.Result> {
    return this.foodSupplies
  }
}