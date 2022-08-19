import { Food } from "../../../domain/models/food"
import { AddFoodRepository } from "../../../domain/repositories/add-food-repository"
import { FoodRepository } from "../../../domain/repositories/food-repository"
import { UpdateFoodRepository } from "../../../domain/repositories/update-food-repository"
import { parseIntOrZeroIfNaN } from "../../../domain/utils"

export class FoodFetchRepository implements FoodRepository {
  constructor(
    private readonly hostAddress: string,
    private readonly authorizationToken: string = ''
  ) { }

  private toModel(food: any) {
    return {
      id: food.id,
      name: food.name,
      createdAt: new Date(food.createdAt),
      updatedAt: food.updatedAt ? new Date(food.createdAt) : undefined,
      expiresIn: parseIntOrZeroIfNaN(food.expiresIn)
    }
  }

  async removeById(id: string): Promise<void> {
    const response = await fetch(`${this.hostAddress}/foods/${id}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      const body = await response.json()
      throw new Error(body.message)
    }
  }

  async add(params: AddFoodRepository.Params): Promise<Food> {
    const response = await fetch(`${this.hostAddress}/foods`, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authorizationToken}`
      }
    })

    const body = await response.json()

    if (!response.ok) {
      throw new Error(body.message)
    }

    return this.toModel(body)
  }

  async updateById(id: string, data: UpdateFoodRepository.Data): Promise<Food> {
    const response = await fetch(`${this.hostAddress}/foods/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    })

    const body = await response.json()

    if (!response.ok) {
      throw new Error(body.message)
    }

    return this.toModel(body)
  }

  async loadOneById(foodId: string): Promise<Food> {
    const response = await fetch(`${this.hostAddress}/foods/${foodId}`)
    const body = await response.json()

    if (!response.ok) {
      throw new Error(body.message)
    }

    return this.toModel(body)
  }

  async loadAll(): Promise<Food[]> {
    const response = await fetch(`${this.hostAddress}/foods`)
    const body = await response.json()

    if (!response.ok) {
      throw new Error(body.message)
    }

    return body.map(this.toModel)
  }
}