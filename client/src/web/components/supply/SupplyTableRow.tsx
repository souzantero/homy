import { ButtonGroup, Td, Tr } from '@chakra-ui/react'
import { Supply } from '../../../domain'
import { NavButton } from '../layout'
import { If } from '../utils'
import { RemoveSupplyButton } from './RemoveSupplyButton'

interface Props {
  supply: Supply
  onShow: () => void
  onRemove: () => void
  isLoading?: boolean
  isReadOnly?: boolean
  isDisabled?: boolean
}

export function SupplyTableRow({ supply, onShow, onRemove, ...rest }: Props) {
  const isLoading = rest.isLoading || false
  const isReadOnly = rest.isReadOnly || false
  const isDisabled = rest.isDisabled || false

  return (
    <Tr>
      <Td>{supply.name}</Td>
      <Td isNumeric>
        <ButtonGroup>
          <NavButton onNavigate={onShow}>Abrir</NavButton>
          <If condition={!isReadOnly}>
            <RemoveSupplyButton
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
