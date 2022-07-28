import { SuppliedFoodModel } from "./supplied-food"

export type FoodModel = {
  id: string
  createdAt: Date
  updatedAt?: Date
  deletedAt?: Date
  name: string
  expiresIn: number
  suppliedFoods?: SuppliedFoodModel[]
}