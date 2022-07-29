import { useEffect, useState } from "react"
import { Food } from "../../domain/models/food"
import { FoodRepository } from "../../domain/repositories/food-repository"

export type Result = {
  foods?: Food[]
}

export function useFoods(foodRepository: FoodRepository): Result {
  const [foods, setFoods] = useState<Food[]>()

  useEffect(() => {
    foodRepository
      .find()
      .then(setFoods)
  }, [])

  return { foods }
}