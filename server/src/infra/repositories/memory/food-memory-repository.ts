import { Food } from '../../../domain/models/food'
import { AddFoodRepository } from '../../../domain/repositories/add-food-repository'
import { LoadFoodsRepository } from '../../../domain/repositories/load-foods-repository'

export class FoodMemoryRepository
  implements AddFoodRepository, LoadFoodsRepository
{
  constructor(private readonly foods: Food[] = []) {}

  loadMany(
    where: LoadFoodsRepository.Where
  ): Promise<LoadFoodsRepository.Result> {
    throw new Error('Method not implemented.')
  }

  async add(food: AddFoodRepository.Params): Promise<Food> {
    this.foods.push(food)
    return food
  }

  async loadAll(): Promise<LoadFoodsRepository.Result> {
    return this.foods
  }
}
