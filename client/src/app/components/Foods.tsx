import { Skeleton } from '@chakra-ui/react'

import { useMemo } from "react"
import { useFoods } from "../hooks/useFoods"
import { FoodTable } from './FoodTable'

export function Foods() {
  const { foods } = useFoods()
  const fetching = useMemo(() => !foods, [foods])

  if (fetching) return <Skeleton height='20px' />

  return (
    <FoodTable foods={foods || []} />
  )
}