import {
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Skeleton
} from '@chakra-ui/react'
import { Product } from '../../../domain'
import { ProductTableRow } from './ProductTableRow'

export interface ProductTableProps {
  products: Product[]
  isLoading: boolean
  isReadOnly?: boolean
  isDisabled?: boolean
  onShowProduct: (product: Product) => void
  onRemoveProduct: (product: Product) => void
}

export function ProductTable({
  products,
  isLoading,
  isReadOnly,
  isDisabled,
  onShowProduct,
  onRemoveProduct
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
          {products.map((product, index) => (
            <ProductTableRow
              key={index}
              product={product}
              isLoading={isLoading}
              isReadOnly={isReadOnly}
              isDisabled={isDisabled}
              onShow={() => onShowProduct(product)}
              onRemove={() => onRemoveProduct(product)}
            />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
