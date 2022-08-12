import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { Food } from "../../domain/models/food"
import { useNotifier } from "./useNotifier"
import { useRepository } from "./useRepository"

export type Result = {
  isLoading: boolean
  error?: any
  foods: Food[]
}

export function useFoods(): Result {
  const { notify } = useNotifier()
  const repository = useRepository()
  const { data, isLoading, error } = useQuery(['foods'], () => repository.food.loadAll(), {
    refetchOnWindowFocus: true
  })

  const foods = data || []

  useEffect(() => {
    if (error) {
      const description = error instanceof Error ? error.message : ''

      notify({
        status: 'error',
        title: 'Falha ao buscar alimentos.',
        description
      })
    }
  }, [error])

  return { isLoading, foods, error }
}