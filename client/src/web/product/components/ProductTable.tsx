import {
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Skeleton
} from '@chakra-ui/react'
import { useProducts } from '../hooks'
import { ProductTableRow } from './ProductTableRow'

export function ProductTable() {
  const { products, isLoading } = useProducts()
  if (isLoading) return <Skeleton height="20px" />
  return (
    <TableContainer>
      <Table variant="striped" colorScheme={'facebook'} size="sm">
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th isNumeric />
          </Tr>
        </Thead>
        <Tbody>
          {products.map((product, index) => (
            <ProductTableRow key={index} product={product} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
