import {
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Skeleton
} from '@chakra-ui/react'
import { useFoods } from '../../hooks/useFoods'
import { FoodTableRow } from './FoodTableRow'

export function FoodTable() {
  const { foods, isLoading } = useFoods()
  if (isLoading) return <Skeleton height="20px" />
  return (
    <TableContainer>
      <Table variant="striped" colorScheme={'facebook'} size="sm">
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th isNumeric>Validade</Th>
            <Th isNumeric />
          </Tr>
        </Thead>
        <Tbody>
          {foods.map((food, index) => (
            <FoodTableRow key={index} food={food} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
