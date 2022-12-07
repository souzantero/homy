import {
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Skeleton
} from '@chakra-ui/react'
import { Supply } from '../../../domain'
import { SupplyTableRow } from './SupplyTableRow'

interface Props {
  supplies: Supply[]
  isLoading: boolean
  isReadOnly?: boolean
  isDisabled?: boolean
  onShowSupply: (supply: Supply) => void
  onRemoveSupply: (supply: Supply) => void
}

export function SupplyTable({
  supplies,
  isLoading,
  isReadOnly,
  isDisabled,
  onShowSupply,
  onRemoveSupply
}: Props) {
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
          {supplies.map((supply, index) => (
            <SupplyTableRow
              key={index}
              supply={supply}
              isLoading={isLoading}
              isReadOnly={isReadOnly}
              isDisabled={isDisabled}
              onShow={() => onShowSupply(supply)}
              onRemove={() => onRemoveSupply(supply)}
            />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
