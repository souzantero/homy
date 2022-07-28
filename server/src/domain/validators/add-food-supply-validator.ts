import { FoodNotFoundError } from "../errors/food-not-found-error";
import { LoadFoodsRepository } from "../repositories/load-foods-repository";
import { AddFoodSupply } from "../usecases/add-food-supply";

export class AddFoodSupplyValidator {
  constructor(
    private readonly loadFoodsRepository: LoadFoodsRepository
  ) { }

  async validate(addFoodSupplyParams: AddFoodSupply.Params): Promise<void> {
    const foods = await this.loadFoodsRepository.loadAll()
    const foodIds = foods.map(food => food.id)

    for (const suppliedFood of addFoodSupplyParams) {
      if (!foodIds.includes(suppliedFood.foodId)) {
        throw new FoodNotFoundError(suppliedFood.foodId)
      }
    }
  }
}