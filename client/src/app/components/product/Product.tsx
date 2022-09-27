import { Box, ButtonGroup, Flex, Skeleton, Text } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { Role } from '../../../domain/models/user'
import { useProduct } from '../../hooks/useProduct'
import { Authorization } from '../auth/Authorization'
import { Signed } from '../auth/sign-in/Signed'
import { NavButton } from '../button/NavButton'
import { Page } from '../layout/Page'
import { PageBody } from '../layout/PageBody'
import { PageHeader } from '../layout/PageHeader'

function TextDisplay({ label, value }: { label: string; value?: string }) {
  return (
    <Flex>
      <Text fontWeight={'bold'}>{label}:</Text>
      <Box width={'10px'} />
      <Text>{value}</Text>
    </Flex>
  )
}

export function Product() {
  const { productId } = useParams()
  const { isLoading, product } = useProduct(productId || '')
  if (isLoading) return <Skeleton />
  return (
    <Page>
      <PageHeader title={'Produto'}>
        <ButtonGroup>
          <Signed>
            <Authorization roles={[Role.Admin]} disable>
              <NavButton
                to={`/products/${productId}/edit`}
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
          value={product?.id.toString()}
        />
        <TextDisplay label="Nome" value={product?.name.toString()} />

        <TextDisplay
          label="Criado em"
          value={product?.createdAt.toLocaleString()}
        />
        {product?.updatedAt && (
          <TextDisplay
            label="Última atualização"
            value={product?.updatedAt.toLocaleString()}
          />
        )}
      </PageBody>
    </Page>
  )
}
