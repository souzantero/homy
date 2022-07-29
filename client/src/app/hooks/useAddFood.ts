import { useToast } from "@chakra-ui/react"
import { useState } from "react"
import { Food } from "../../domain/models/food"
import { AddFood } from "../../domain/usacases/add-food"
import { useRepository } from "./useRepository"

export type Result = {
  isAdding: Boolean
  addFood: (params: AddFood.Params) => Promise<Food | undefined>
}

export function useAddFood(): Result {
  const toast = useToast()
  const [isAdding, setIsAdding] = useState(false)
  const { repository } = useRepository()

  const addFood = async (params: AddFood.Params) => {
    try {
      setIsAdding(true)
      const addFood = new AddFood(repository.food)
      const food = await addFood.add(params)

      toast({
        status: 'success',
        title: 'Alimento adicionado.',
        description: "Alimento adicionado com sucesso.",
      })

      return food
    } catch (error) {
      const status = 'error'
      const title = 'Falha ao adicionar alimento.'
      const description = error instanceof Error ? error.message : 'Não foi possível adicionar o alimento no momento, tente novamente mais tarde.'
      toast({ status, title, description })
    } finally {
      setIsAdding(false)
    }
  }

  return { isAdding, addFood }
}