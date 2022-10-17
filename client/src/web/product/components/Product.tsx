import { Box, ButtonGroup, Flex, Skeleton, Text } from '@chakra-ui/react'
import { Product as ProductModel, Role } from '../../../domain'
import { Authorization, Signed } from '../../auth'
import { NavButton, Page, PageBody, PageHeader } from '../../layout'

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
  isLoading: boolean
  onEdit: () => void
}

export function Product({ product, isLoading, onEdit }: ProductProps) {
  if (isLoading) return <Skeleton />
  return (
    <Page>
      <PageHeader title={'Produto'}>
        <ButtonGroup>
          <Signed>
            <Authorization roles={[Role.Admin]} disable>
              <NavButton
                onNavigate={onEdit}
                isLoading={isLoading}
                isDisabled={isLoading || !product}
              >
                Editar
              </NavButton>
            </Authorization>
          </Signed>
        </ButtonGroup>
      </PageHeader>
      <PageBody>
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
      </PageBody>
    </Page>
  )
}
