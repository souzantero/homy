import { Box, Button, ButtonGroup, Container, Flex, Heading, Skeleton, Spacer } from '@chakra-ui/react'

import { useMemo } from "react"
import { useFoods } from "../hooks/useFoods"
import { FoodTable } from './FoodTable'

export function Foods() {
  const { foods } = useFoods()
  const fetching = useMemo(() => !foods, [foods])

  if (fetching) return <Skeleton height='20px' />

  return (
    <Container padding='2'>
      <Flex padding='2' minWidth='max-content' alignItems='center' gap='2'>
        <Box padding='2'>
          <Heading size='md'>Alimentos</Heading>
        </Box>
        <Spacer />
        <ButtonGroup gap='2'>
          <Button colorScheme='red'>Adicionar</Button>
        </ButtonGroup>
      </Flex>
      <Box marginTop='2'>
        <FoodTable foods={foods || []} />
      </Box>
    </Container>
  )
}