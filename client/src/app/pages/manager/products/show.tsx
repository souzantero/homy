import { ButtonGroup, Skeleton, useToast } from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router-dom'
import { Role } from '../../../../domain'
import {
  If,
  NavButton,
  Page,
  PageBody,
  PageHeader,
  Product,
  useProduct
} from '../../../../web'
import {
  useAuthorization,
  useQueryProduct,
  useSignedUser
} from '../../../hooks'

export function ProductPage() {
  const notify = useToast()
  const navigate = useNavigate()
  const { productId } = useParams()
  const { isLoading, product } = useProduct({
    useData: () => useQueryProduct(productId!),
    onNotify: notify
  })

  const { isSigned } = useSignedUser()
  const { isAuthorized } = useAuthorization(Role.Admin)

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
