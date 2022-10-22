import { ButtonGroup, Td, Tr } from '@chakra-ui/react'
import { Product } from '../../../domain'
import { NavButton } from '../layout'
import { If } from '../utils'
import { RemoveProductButton } from './RemoveProductButton'

export interface ProductTableRowProps {
  product: Product
  onShow: () => void
  onRemove: () => void
  isLoading?: boolean
  isReadOnly?: boolean
  isDisabled?: boolean
}

export function ProductTableRow({
  product,
  onShow,
  onRemove,
  ...rest
}: ProductTableRowProps) {
  const isLoading = rest.isLoading || false
  const isReadOnly = rest.isReadOnly || false
  const isDisabled = rest.isDisabled || false

  return (
    <Tr>
      <Td>{product.name}</Td>
      <Td isNumeric>
        <ButtonGroup>
          <NavButton onNavigate={onShow}>Abrir</NavButton>
          <If condition={!isReadOnly}>
            <RemoveProductButton
              isRemoving={isLoading}
              onRemove={onRemove}
              isDisabled={isDisabled}
            />
          </If>
        </ButtonGroup>
      </Td>
    </Tr>
  )
}
