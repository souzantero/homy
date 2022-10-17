import { ButtonGroup, Td, Tr } from '@chakra-ui/react'
import { Product, Role } from '../../../domain'
import { Authorization, Signed } from '../../auth'
import { NavButton } from '../../layout'
import { RemoveProductButton } from './RemoveProductButton'

export interface ProductTableRowProps {
  product: Product
  isRemoving: boolean
  onRemove: () => Promise<boolean>
  onShow: () => void
}

export function ProductTableRow({
  product,
  isRemoving,
  onRemove,
  onShow
}: ProductTableRowProps) {
  return (
    <Tr>
      <Td>{product.name}</Td>
      <Td isNumeric>
        <ButtonGroup>
          <NavButton onNavigate={onShow}>Abrir</NavButton>
          <Signed>
            <Authorization roles={[Role.Admin]} disable>
              <RemoveProductButton
                isRemoving={isRemoving}
                onRemove={onRemove}
              />
            </Authorization>
          </Signed>
        </ButtonGroup>
      </Td>
    </Tr>
  )
}
