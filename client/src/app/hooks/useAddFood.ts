import { useState } from "react"
import { useQueryClient } from '@tanstack/react-query'
import { Food } from "../../domain/models/food"
import { AddFoodRepository } from "../../domain/repositories/add-food-repository"
import { useRepository } from "./useRepository"
import { useNotifier } from "./useNotifier"


export type Result = {
  isAdding: boolean
  addFood: (params: AddFoodRepository.Params) => Promise<Food | undefined>
}

export function useAddFood(): Result {
  const { notify } = useNotifier()
  const queryClient = useQueryClient()
  const [isAdding, setIsAdding] = useState(false)
  const repository = useRepository()

  const addFood = async (params: AddFoodRepository.Params) => {
    try {
      setIsAdding(true)
      const food = await repository.food.add(params)

      notify({
        status: 'success',
        title: 'Alimento adicionado.',
        description: "Alimento adicionado com sucesso.",
      })

      queryClient.invalidateQueries(['foods'])

      return food
    } catch (error) {
      const status = 'error'
      const title = 'Falha ao adicionar alimento.'
      const description = error instanceof Error ? error.message : 'Não foi possível adicionar o alimento no momento, tente novamente mais tarde.'
      notify({ status, title, description })
    } finally {
      setIsAdding(false)
    }
  }

  return { isAdding, addFood }
}