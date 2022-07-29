import { Skeleton } from '@chakra-ui/react'

import { useMemo } from "react"
import { useFoods } from "../hooks/useFoods"
import { FoodRepository } from '../../domain/repositories/food-repository'
import { FoodTable } from './FoodTable'

export interface FoodsProps {
  foodRepository: FoodRepository
}

export function Foods({
  foodRepository
}: FoodsProps) {
  const { foods } = useFoods(foodRepository)
  const fetching = useMemo(() => !foods, [foods])

  if (fetching) return <Skeleton height='20px' />

  return (
    <FoodTable foods={foods || []} />
  )
}