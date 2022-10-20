import { ButtonGroup, Skeleton } from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router-dom'
import { Role } from '../../../../domain'
import {
  If,
  NavButton,
  Page,
  PageBody,
  PageHeader,
  Product
} from '../../../../web'
import { useProductById, useAuthorization, useSignedUser } from '../../../hooks'

export function ProductPage() {
  const navigate = useNavigate()
  const { isSigned } = useSignedUser()
  const { isAuthorized } = useAuthorization(Role.Admin)
  const { productId } = useParams()
  const { isLoading, product } = useProductById(productId!)

  return (
    <Page>
      <PageHeader title={'Produto'}>
        <ButtonGroup>
          <If condition={isSigned}>
            <NavButton
              onNavigate={() => navigate(`/manager/products/${productId}/edit`)}
              isLoading={isLoading}
              isDisabled={!isAuthorized || isLoading || !product}
            >
              Editar
            </NavButton>
          </If>
        </ButtonGroup>
      </PageHeader>
      <PageBody>
        {isLoading ? <Skeleton /> : <Product product={product!} />}
      </PageBody>
    </Page>
  )
}
