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
  isRemoving: boolean
  onShowProduct: (product: Product) => void
  onRemoveProduct: (product: Product) => Promise<boolean>
}
export function ProductTable({
  products,
  isLoading,
  isRemoving,
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
              isRemoving={isRemoving}
              onShow={() => onShowProduct(product)}
              onRemove={() => onRemoveProduct(product)}
            />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
