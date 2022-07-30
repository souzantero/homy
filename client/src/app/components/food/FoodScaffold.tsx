import { Box, Button, ButtonGroup, Container, Flex, Heading, Skeleton, Spacer, useBoolean, useToast } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useFoods } from "../../hooks/useFoods"
import { AddFoodModal } from './AddFoodModal'
import { FoodTable } from './FoodTable'

export function FoodScaffold() {
  const toast = useToast()
  const [isAdd, isAddAction] = useBoolean()
  const { foods, isLoading, error } = useFoods()
  const handleClickAdd = () => {
    isAdd ? isAddAction.off() : isAddAction.on()
  }

  useEffect(() => {
    if (error) {
      const description = error.message ? error.message : ''
      
      toast({
        status: 'error',
        title: 'Falha ao buscar alimentos.',
        description
      })
    }
  }, [error])

  if (isLoading) return <Skeleton height='20px' />
  return (
    <>
      <AddFoodModal isOpen={isAdd} onClose={isAddAction.off} />
      <Container padding='2'>
        <Flex padding='2' minWidth='max-content' alignItems='center' gap='2'>
          <Box padding='2'>
            <Heading size='md'>Alimentos</Heading>
          </Box>
          <Spacer />
          <ButtonGroup gap='2'>
            <Button onClick={handleClickAdd}>Adicionar</Button>
          </ButtonGroup>
        </Flex>
        <Box marginTop='2'>
          <FoodTable foods={foods} />
        </Box>
      </Container>
    </>
  )
}