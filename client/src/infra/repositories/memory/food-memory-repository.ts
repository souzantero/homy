import { Food } from "../../../domain/models/food"
import { AddFoodRepository } from "../../../domain/repositories/add-food-repository"
import { FoodRepository } from "../../../domain/repositories/food-repository"

export class FoodMemoryRepository implements FoodRepository {
  constructor(
    private readonly foods: Food[]
  ) { }
  
  
  removeById(id: string): Promise<void> {
    throw new Error("Method not implemented.")
  }

  async add(params: AddFoodRepository.Params): Promise<Food> {
    const food: Food = { id: Date.now().toString(), createdAt: new Date(), ...params }
    this.foods.push(food)
    return food
  }

  async loadAll(): Promise<Food[]> {
    return this.foods
  }

  async loadOneById(foodId: string): Promise<Food> {
    const food = this.foods.find(food => food.id === foodId)

    if (!food) {
      throw new Error('Food not found')
    }

    return food
  }
}