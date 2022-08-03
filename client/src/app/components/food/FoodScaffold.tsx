import { Box, Button, ButtonGroup, Container, Flex, Heading, Skeleton, Spacer, useBoolean } from '@chakra-ui/react'
import { Food } from '../../../domain/models/food'
import { useFoods } from "../../hooks/useFoods"
import { useRemoveFood } from '../../hooks/useRemoveFood'
import { AddFoodModal } from './AddFoodModal'
import { FoodTable } from './FoodTable'

export function FoodScaffold() {
  const [isAdd, isAddAction] = useBoolean()
  const { foods, isLoading } = useFoods()
  const { removeFood, isRemoving } = useRemoveFood()
  const handleClickAdd = () => {
    isAdd ? isAddAction.off() : isAddAction.on()
  }

  if (isLoading) return <Skeleton height='20px' />
  return (
    <>
      <AddFoodModal isOpen={isAdd} onClose={isAddAction.off} />
      <Box padding='2'>
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
          <FoodTable foods={foods} onRemove={removeFood} />
        </Box>
      </Box>
    </>
  )
}