import { TableContainer, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'
import { Food } from '../../../domain/models/food'

export interface FoodTableProps {
  foods: Food[]
}

export function FoodTable({
  foods
}: FoodTableProps) {
  return (
    <TableContainer>
      <Table variant='simple' size='sm'>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Nome</Th>
            <Th isNumeric>Validade</Th>
          </Tr>
        </Thead>
        <Tbody>
          {
            foods.map((food, index) => (
              <Tr key={index}>
                <Td>{food.id}</Td>
                <Td>{food.name}</Td>
                <Td isNumeric>{food.expiresIn.toString()} </Td>
              </Tr>
            ))
          }
        </Tbody>
      </Table>
    </TableContainer>
  )
}