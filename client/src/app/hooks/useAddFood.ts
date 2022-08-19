import { useState } from "react"
import { useQueryClient } from '@tanstack/react-query'
import { Food } from "../../domain/models/food"
import { useToast } from "@chakra-ui/react"
import { makeAddFoodService } from "../factories/add-food-service-factory"
import { AddFoodService } from "../../domain/services/add-food-service"
import { useSignedUser } from "./useSignedUser"

export type Result = {
  isAdding: boolean
  addFood: (params: AddFoodService.Params) => Promise<Food | undefined>
}

export function useAddFood(): Result {
  const notify = useToast()
  const queryClient = useQueryClient()
  const { signedUser } = useSignedUser()
  const [isAdding, setIsAdding] = useState(false)

  const addFood = async (params: AddFoodService.Params) => {
    try {
      setIsAdding(true)
      const createFood = makeAddFoodService(signedUser?.authorizationToken || '')
      const food = await createFood.add(params)

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