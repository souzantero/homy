import { FoodSupplyModel } from "../../../domain/models/food-supply";
import { AddFoodSupplyRepository } from "../../../domain/repositories/add-food-supply-repository";

export class FoodSupplyMemoryRepository implements AddFoodSupplyRepository {
  constructor(
    private readonly foodSupplies: FoodSupplyModel[] = []
  ) { }

  async add(foodSupplyParams: AddFoodSupplyRepository.Params): Promise<FoodSupplyModel> {
    const foodSupply = { id: foodSupplyParams.id, createdAt: foodSupplyParams.createdAt }
    this.foodSupplies.push(foodSupply)
    return foodSupply
  }
}