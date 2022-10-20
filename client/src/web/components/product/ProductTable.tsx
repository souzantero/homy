import {
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Skeleton
} from '@chakra-ui/react'
import { ReactNode } from 'react'
import { Product } from '../../../domain'

export interface ProductTableProps {
  products: Product[]
  isLoading: boolean
  renderRow: (product: Product, index: number) => ReactNode
}

export function ProductTable({
  products,
  isLoading,
  renderRow
}: ProductTableProps) {
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
          {products.map((product, index) => renderRow(product, index))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
