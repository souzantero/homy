import { ButtonGroup, Skeleton, useToast } from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router-dom'
import { Role } from '../../../../domain'
import {
  NavButton,
  Page,
  PageBody,
  PageHeader,
  Product,
  useProduct
} from '../../../../web'
import { Authorization, Signed } from '../../../components'
import { useQueryProduct } from '../../../hooks'

export function ProductPage() {
  const notify = useToast()
  const navigate = useNavigate()
  const { productId } = useParams()
  const { isLoading, product } = useProduct({
    useData: () => useQueryProduct(productId!),
    onNotify: notify
  })

  return (
    <Page>
      <PageHeader title={'Produto'}>
        <ButtonGroup>
          <Signed>
            <Authorization roles={[Role.Admin]} disable>
              <NavButton
                onNavigate={() =>
                  navigate(`/manager/products/${productId}/edit`)
                }
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
        {isLoading ? <Skeleton /> : <Product product={product!} />}
      </PageBody>
    </Page>
  )
}
