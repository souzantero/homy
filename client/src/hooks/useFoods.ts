import { useEffect, useState } from "react"
import { Food } from "../models/food"

export type Result = {
  foods?: Food[]
}

export function useFoods(): Result {
  const [foods, setFoods] = useState<Food[]>()

  useEffect(() => {
    const newFoods: Food[] = []

    newFoods.push({ id: Date.now().toString() + '1', name: 'Banana', expiresIn: 5, createdAt: new Date() })
    newFoods.push({ id: Date.now().toString() + '2', name: 'Maçã', expiresIn: 5, createdAt: new Date() })
    newFoods.push({ id: Date.now().toString() + '3', name: 'Mamão', expiresIn: 5, createdAt: new Date() })
    newFoods.push({ id: Date.now().toString() + '4', name: 'Tomate', expiresIn: 5, createdAt: new Date() })
    newFoods.push({ id: Date.now().toString() + '5', name: 'Cenoura', expiresIn: 5, createdAt: new Date() })

    setFoods(newFoods)
  }, [])

  return { foods }
}