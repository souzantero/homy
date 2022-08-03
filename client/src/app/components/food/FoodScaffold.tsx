import { Box, Button, ButtonGroup, Divider, Flex, Heading, Spacer, useBoolean } from '@chakra-ui/react'
import { AddFoodModal } from './AddFoodModal'
import { FoodTable } from './FoodTable'

export interface FoodScaffoldHead {
  onClickAdd: () => void
}

export function FoodScaffoldHead({
  onClickAdd
}: FoodScaffoldHead) {
  return (
    <Flex padding='2' minWidth='max-content' alignItems='center' gap='2'>
      <Box padding='2'>
        <Heading size='md'>Alimentos</Heading>
      </Box>
      <Spacer />
      <ButtonGroup gap='2'>
        <Button 
          color={'blue'}
          borderColor={'blue'}
          variant={'outline'}
          onClick={onClickAdd}
        >
          Adicionar
        </Button>
      </ButtonGroup>
    </Flex>
  )
}

export function FoodScaffold() {
  const [isAdd, isAddAction] = useBoolean()

  const handleClickAdd = () => {
    isAdd ? isAddAction.off() : isAddAction.on()
  }

  return (
    <>
      <AddFoodModal isOpen={isAdd} onClose={isAddAction.off} />
      <Box padding='2'>
        <FoodScaffoldHead onClickAdd={handleClickAdd} />
        <Divider margin={'4'} />
        <Box marginTop='2'>
          <FoodTable />
        </Box>
      </Box>
    </>
  )
}