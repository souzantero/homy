import { Box, Flex, Text } from '@chakra-ui/react'
import { Supply as SupplyModel } from '../../../domain'

function TextDisplay({ label, value }: { label: string; value?: string }) {
  return (
    <Flex>
      <Text fontWeight={'bold'}>{label}:</Text>
      <Box width={'10px'} />
      <Text>{value}</Text>
    </Flex>
  )
}

interface Props {
  supply: SupplyModel
}

export function SupplyInfo({ supply }: Props) {
  return (
    <>
      <TextDisplay
        label="Código de identificação"
        value={supply.id.toString()}
      />
      <TextDisplay label="Nome" value={supply.name.toString()} />

      <TextDisplay
        label="Criado em"
        value={supply.createdAt.toLocaleString()}
      />
      {supply.updatedAt && (
        <TextDisplay
          label="Última atualização"
          value={supply.updatedAt.toLocaleString()}
        />
      )}
    </>
  )
}
