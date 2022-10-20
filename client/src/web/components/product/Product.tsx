import { Box, Flex, Text } from '@chakra-ui/react'
import { Product as ProductModel } from '../../../domain'

function TextDisplay({ label, value }: { label: string; value?: string }) {
  return (
    <Flex>
      <Text fontWeight={'bold'}>{label}:</Text>
      <Box width={'10px'} />
      <Text>{value}</Text>
    </Flex>
  )
}

export interface ProductProps {
  product: ProductModel
}

export function Product({ product }: ProductProps) {
  return (
    <>
      <TextDisplay
        label="Código de identificação"
        value={product.id.toString()}
      />
      <TextDisplay label="Nome" value={product.name.toString()} />

      <TextDisplay
        label="Criado em"
        value={product.createdAt.toLocaleString()}
      />
      {product.updatedAt && (
        <TextDisplay
          label="Última atualização"
          value={product.updatedAt.toLocaleString()}
        />
      )}
    </>
  )
}
