import { useEffect, useState } from "react"
import { Food } from "../../domain/models/food"
import { AddFood } from "../../domain/usacases/add-food"
import { useRepository } from "./useRepository"

export type Result = {
  foods?: Food[],
  addFood: (params: AddFood.Params) => Promise<void>
}

export function useFoods(): Result {
  const { repository } = useRepository()
  const [foods, setFoods] = useState<Food[]>()

  useEffect(() => {
    repository?.food.loadAll().then(setFoods)
    return () => setFoods([])
  }, [])

  const addFood = async (params: AddFood.Params) => {
    try {
      if (repository) {
        const addFood = new AddFood(repository.food)
        const food = await addFood.add(params)
        console.log('Alimento adicionado com sucesso')
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log('Falha ao adicionar alimento', error.message)
      } else {
        throw error
      }
    }
  }

  return { foods, addFood }
}