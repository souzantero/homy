import { useToast } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Food } from '../../domain/models/food'
import { makeLoadFoodByIdService } from '../factories/load-food-by-id-service-factory'

export type Result = {
  food?: Food
  isLoading: boolean
}

export function useFood(foodId: string): Result {
  const notify = useToast()
  const loadFoodById = makeLoadFoodByIdService()
  const {
    data: food,
    isLoading,
    error
  } = useQuery([`food/${foodId}`], () => loadFoodById.load(foodId), {
    refetchOnWindowFocus: true
  })

  useEffect(() => {
    if (error) {
      const description = error instanceof Error ? error.message : ''

      notify({
        status: 'error',
        title: 'Falha ao buscar o alimento.',
        description
      })
    }
  }, [error])

  return { food, isLoading }
}
