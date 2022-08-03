import { useState } from "react"
import { useToast } from "@chakra-ui/react"
import { useQueryClient } from '@tanstack/react-query'
import { Food } from "../../domain/models/food"
import { useRepository } from "./useRepository"

export type Result = {
  isRemoving: Boolean
  removeFood: (food: Food) => Promise<Boolean>
}

export function useRemoveFood(): Result {
  const toast = useToast()
  const queryClient = useQueryClient()
  const [isRemoving, setIsRemoving] = useState(false)
  const repository = useRepository()

  const removeFood = async (food: Food) => {
    try {
      setIsRemoving(true)
      await repository.food.removeById(food.id)

      toast({
        status: 'success',
        title: 'Alimento removido.',
        description: "Alimento removido com sucesso.",
      })

      queryClient.invalidateQueries(['foods'])
      return true
    } catch (error) {
      const status = 'error'
      const title = 'Falha ao remover alimento.'
      const description = error instanceof Error ? error.message : 'Não foi possível remover o alimento no momento, tente novamente mais tarde.'
      toast({ status, title, description })
      return false
    } finally {
      setIsRemoving(false)
    }
  }

  return { isRemoving, removeFood }
}