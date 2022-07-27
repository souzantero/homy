import { FoodModel } from "./food"
import { FoodSupplyModel } from "./food-supply"

export type SuppliedFoodModel = {
  foodSupplyId: string
  foodSupply?: FoodSupplyModel
  foodId: string
  food?: FoodModel
  createdAt: Date
  updatedAt?: Date
  deletedAt?: Date
}