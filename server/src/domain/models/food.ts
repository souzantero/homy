import { SuppliedFood } from "./supplied-food"

export type Food = {
  id: string
  createdAt: Date
  updatedAt?: Date
  deletedAt?: Date
  name: string
  expiresIn: number
  suppliedFoods?: SuppliedFood[]
}