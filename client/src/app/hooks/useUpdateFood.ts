import { useState } from "react"
import { useQueryClient } from '@tanstack/react-query'
import { Food } from "../../domain/models/food"
import { useRepository } from "./useRepository"
import { useNotifier } from "./useNotifier"

export type Result = {
  isUpdating: boolean
  updateFood: (food: Food) => Promise<Food | undefined>
}

export function useUpdateFood(): Result {
  const { notify } = useNotifier()
  const queryClient = useQueryClient()
  const [isUpdating, setIsUpdating] = useState(false)
  const repository = useRepository()

  const updateFood = async (food: Food) => {
    try {
      setIsUpdating(true)
      const { id } = food
      const data = { name: food.name, expiresIn: food.expiresIn }
      const updatedFood = await repository.food.updateById(id, data)

      notify({
        status: 'success',
        title: 'Alimento atualizado.',
        description: "Alimento atualizado com sucesso.",
      })

      queryClient.invalidateQueries(['foods'])

      return updatedFood
    } catch (error) {
      const status = 'error'
      const title = 'Falha ao atualizar alimento.'
      const description = error instanceof Error ? error.message : 'Não foi possível atualizar o alimento no momento, tente novamente mais tarde.'
      notify({ status, title, description })
    } finally {
      setIsUpdating(false)
    }
  }

  return { isUpdating, updateFood }
}