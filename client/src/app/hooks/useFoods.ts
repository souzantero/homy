import { useEffect, useState } from "react"
import { Food } from "../../domain/models/food"
import { useRepository } from "./useRepository"

export type Result = {
  isLoading: Boolean
  error?: any
  foods: Food[]
}

export function useFoods(): Result {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<any>()
  const [foods, setFoods] = useState<Food[]>([])
  const { repository } = useRepository()

  useEffect(() => {
    loadAllFoods()
    return () => setFoods([])
  }, [])

  const loadAllFoods = async () => {
    try {
      setIsLoading(true)
      const allFoods = await repository.food.loadAll()
      setFoods(allFoods)
    } catch (error) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, foods, error }
}