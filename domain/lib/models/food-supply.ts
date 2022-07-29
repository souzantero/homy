import { SuppliedFood } from "./supplied-food"

export type FoodSupply = {
  id: string
  createdAt: Date
  updatedAt?: Date
  deletedAt?: Date
  suppliedFoods?: SuppliedFood[]
}