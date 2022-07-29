import { useState } from "react"
import { Food } from "../../domain/models/food"
import { AddFood } from "../../domain/usacases/add-food"
import { useRepository } from "./useRepository"

export type Result = {
  isAdding: Boolean
  addFood: (params: AddFood.Params) => Promise<Food>
}

export function useAddFood(): Result {
  const [isAdding, setIsAdding] = useState(false)
  const { repository } = useRepository()

  const addFood = async (params: AddFood.Params) => {
    try {
      setIsAdding(true)
      const addFood = new AddFood(repository.food)
      return await addFood.add(params)
    } catch (error) {
      throw error
    } finally {
      setIsAdding(false)
    }
  }

  return { isAdding, addFood }
}