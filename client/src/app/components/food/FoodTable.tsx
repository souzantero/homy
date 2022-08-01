import { TableContainer, Table, Thead, Tbody, Tr, Th, Td, IconButton } from '@chakra-ui/react'
import { AiOutlineDelete } from 'react-icons/ai'
import { Food } from '../../../domain/models/food'

export interface FoodTableProps {
  foods: Food[]
  onRemove?: (food: Food) => void
}

export function FoodTable({
  foods,
  onRemove
}: FoodTableProps) {
  return (
    <TableContainer>
      <Table variant='simple' size='sm'>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Nome</Th>
            <Th isNumeric>Validade</Th>
            {
              onRemove && <Th/>
            }
          </Tr>
        </Thead>
        <Tbody>
          {
            foods.map((food, index) => (
              <Tr key={index}>
                <Td>{food.id}</Td>
                <Td>{food.name}</Td>
                <Td isNumeric>{food.expiresIn.toString()} </Td>
                {
                  onRemove && (
                    <Td>
                      <IconButton 
                        aria-label='Remover alimento'
                        onClick={() => onRemove(food)}
                        icon={<AiOutlineDelete />} />
                    </Td>
                  )
                }
              </Tr>
            ))
          }
        </Tbody>
      </Table>
    </TableContainer>
  )
}