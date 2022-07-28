import { LoadSuppliedFoodsRepository } from "../../../domain/repositories/load-supplied-foods-repository";
import { SuppliedFoodModel } from "../../../domain/models/supplied-food";

export class SuppliedFoodMemoryRepository implements LoadSuppliedFoodsRepository {
  constructor(
    private readonly suppliedFoods: SuppliedFoodModel[] = []
  ) { }

  async loadManyByFoodSupplyId(foodSupplyId: string): Promise<LoadSuppliedFoodsRepository.Result> {
    return this.suppliedFoods.filter(suppliedFood => suppliedFood.foodSupplyId === foodSupplyId)
  }
}