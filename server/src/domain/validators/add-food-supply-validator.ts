import { FoodNotFoundError } from '../errors/food-not-found-error'
import { AddFoodSupply } from '../usecases/add-food-supply'
import { LoadFoods } from '../usecases/load-foods'

export class AddFoodSupplyValidator {
  constructor(private readonly loadFoods: LoadFoods) {}

  async validate(addFoodSupplyParams: AddFoodSupply.Params): Promise<void> {
    const foods = await this.loadFoods.load()
    const foodIds = foods.map((food) => food.id)

    for (const suppliedFood of addFoodSupplyParams) {
      if (!foodIds.includes(suppliedFood.foodId)) {
        throw new FoodNotFoundError(suppliedFood.foodId)
      }
    }
  }
}
