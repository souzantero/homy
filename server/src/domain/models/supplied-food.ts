import { Food } from './food'
import { FoodSupply } from './food-supply'

export type SuppliedFood = {
  foodSupplyId: string
  foodSupply?: FoodSupply
  foodId: string
  food?: Food
  createdAt: Date
  updatedAt?: Date
  deletedAt?: Date
}
