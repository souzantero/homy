import { useMemo } from "react"
import { Food } from "../../domain/models/food"
import { useFoods } from "./useFoods"

export type Result = {
  food?: Food
  isLoading: boolean
}

export function useFood(foodId: string): Result {
  const { foods, isLoading } = useFoods()
  const food = useMemo(() => foods.find(food => food.id === foodId), [foods])
  return { food, isLoading }
}