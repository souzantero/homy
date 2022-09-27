import { ButtonGroup, Td, Tr } from '@chakra-ui/react'
import { Product } from '../../../domain/models/product'
import { Role } from '../../../domain/models/user'
import { useRemoveProduct } from '../../hooks/useRemoveProduct'
import { Authorization } from '../auth/Authorization'
import { Signed } from '../auth/sign-in/Signed'
import { NavButton } from '../button/NavButton'
import { RemoveProdutButton } from './RemoveProductButton'

export interface ProductTableRowProps {
  product: Product
}

export function ProductTableRow({ product }: ProductTableRowProps) {
  const { removeProduct, isRemoving } = useRemoveProduct()
  return (
    <Tr>
      <Td>{product.name}</Td>
      <Td isNumeric>
        <ButtonGroup>
          <NavButton to={`/products/${product.id}`}>Abrir</NavButton>
          <Signed>
            <Authorization roles={[Role.Admin]} disable>
              <RemoveProdutButton
                isRemoving={isRemoving}
                onRemove={() => removeProduct(product)}
              />
            </Authorization>
          </Signed>
        </ButtonGroup>
      </Td>
    </Tr>
  )
}
