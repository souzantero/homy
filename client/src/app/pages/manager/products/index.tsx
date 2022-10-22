import { ButtonGroup, useToast } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { Role } from '../../../../domain'
import {
  If,
  NavButton,
  Page,
  PageBody,
  PageHeader,
  ProductTable,
  useProducts,
  useRemoveProduct
} from '../../../../web'
import { makeRemoveProductById } from '../../../factories'
import { useAuthorization, useAllProducts, useSignedUser } from '../../../hooks'

export function ProductsPage() {
  const notify = useToast()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { products, isLoading } = useProducts({
    useData: () => useAllProducts(),
    onNotify: notify
  })

  const { signedUser } = useSignedUser()
  const { isRemoving, removeProduct } = useRemoveProduct({
    removeProductByIdFactory: () => makeRemoveProductById(signedUser!),
    onNotify: notify,
    onRemoved: () => {
      queryClient.invalidateQueries(['products'])
    }
  })

  const { isSigned } = useSignedUser()
  const { isAuthorized } = useAuthorization(Role.Admin)

  return (
    <Page>
      <PageHeader title="Produtos">
        <ButtonGroup>
          <If condition={isSigned}>
            <NavButton
              onNavigate={() => navigate('/manager/products/new')}
              isDisabled={!isAuthorized}
            >
              Adicionar
            </NavButton>
          </If>
        </ButtonGroup>
      </PageHeader>
      <PageBody>
        <ProductTable
          products={products}
          isReadOnly={!isSigned}
          isDisabled={!isAuthorized}
          isLoading={isLoading || isRemoving}
          onShowProduct={(product) =>
            navigate(`/manager/products/${product.id}`)
          }
          onRemoveProduct={(product) => removeProduct(product)}
        />
      </PageBody>
    </Page>
  )
}
