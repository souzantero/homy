import { Box, Divider, Heading, Skeleton } from "@chakra-ui/react";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useFoods } from "../../hooks/useFoods";

export function Food() {
  const { foodId } = useParams()
  const { foods, isLoading } = useFoods()
  const food = useMemo(() => foods.find(food => food.id === foodId), [foods])

  if (isLoading) return <Skeleton/>
  return (
    <Box padding={2}>
      <Box padding={2}>
        <Heading size={'md'}>{'Alimento'}</Heading>
      </Box>
      <Divider margin={4} />
    </Box>
  )
}