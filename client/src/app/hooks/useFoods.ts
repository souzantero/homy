import { useToast } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { Food } from "../../domain/models/food"
import { makeLoadFoodsService } from "../factories/load-foods-service-factory"

export type Result = {
  isLoading: boolean
  error?: any
  foods: Food[]
}

export function useFoods(): Result {
  const notify = useToast()
  const loadFoods = makeLoadFoodsService()
  const { data, isLoading, error } = useQuery(['foods'], () => loadFoods.load(), {
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