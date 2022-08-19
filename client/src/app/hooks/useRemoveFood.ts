import { useState } from "react"
import { useToast } from "@chakra-ui/react"
import { useQueryClient } from '@tanstack/react-query'
import { Food } from "../../domain/models/food"
import { makeRemoveFoodByIdService } from "../factories/remove-food-by-id-service-factory"

export type Result = {
  isRemoving: boolean
  removeFood: (food: Food) => Promise<boolean>
}

export function useRemoveFood(): Result {
  const notify = useToast()
  const queryClient = useQueryClient()
  const [isRemoving, setIsRemoving] = useState(false)
  
  const removeFood = async (food: Food) => {
    try {
      setIsRemoving(true)

      const removeFoodById = makeRemoveFoodByIdService()
      await removeFoodById.remove(food.id)

      notify({
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
      notify({ status, title, description })
      return false
    } finally {
      setIsRemoving(false)
    }
  }

  return { isRemoving, removeFood }
}