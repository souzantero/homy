import { useQuery } from "@tanstack/react-query"
import { Food } from "../../domain/models/food"
import { useRepository } from "./useRepository"

export type Result = {
  isLoading: Boolean
  error?: any
  foods: Food[]
}

export function useFoods(): Result {
  const repository = useRepository()
  const { data, isLoading, error } = useQuery(['foods'], () => repository.food.loadAll(), {
    refetchOnWindowFocus: true
  })

  const foods = data || []
  return { isLoading, foods, error }
}