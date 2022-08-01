import { Food } from "../../../domain/models/food"
import { AddFoodRepository } from "../../../domain/repositories/add-food-repository"
import { FoodRepository } from "../../../domain/repositories/food-repository"

export class FoodFetchRepository implements FoodRepository {
  constructor(private readonly hostAddress: string) { }

  remove(food: Food): Promise<void> {
    return Promise.resolve()
  }

  async add(params: AddFoodRepository.Params): Promise<Food> {
    const response = await fetch(`${this.hostAddress}/foods`, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: { 'Content-Type': 'application/json' }
    })

    return this.handleResponse(response)
  }

  async loadAll(): Promise<Food[]> {
    const response = await fetch(`${this.hostAddress}/foods`)
    return this.handleResponse(response)
  }

  private async handleResponse(response: Response) {
    const body = await response.json()

    if (!response.ok) {
      throw new Error(body.message)
    }

    return body
  }
}