import { SuppliedFoodModel } from "./supplied-food"

export type FoodSupplyModel = {
  id: string
  createdAt: Date
  updatedAt?: Date
  deletedAt?: Date
  suppliedFoods?: SuppliedFoodModel[]
}