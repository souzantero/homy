import { Box, Button, ButtonGroup, Divider, Flex, Heading, Spacer } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { FoodTable } from './FoodTable'

export function FoodsHead() {
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
        >
          <Link to={'/foods/new'}>Adicionar</Link>
        </Button>
      </ButtonGroup>
    </Flex>
  )
}

export function Foods() {
  return (
    <Box padding={2}>
      <FoodsHead />
      <Divider margin={4} />
      <Box padding={2}>
        <FoodTable />
      </Box>
    </Box>
  )
}