import { useEffect, useState } from "react"
import { Food } from "../../domain/models/food"
import { useRepository } from "./useRepository"

export type Result = {
  foods?: Food[]
}

export function useFoods(): Result {
  const { repository } = useRepository()
  const [foods, setFoods] = useState<Food[]>()

  useEffect(() => {
    repository?.food.findAll().then(setFoods)
    return () => setFoods([])
  }, [])

  return { foods }
}