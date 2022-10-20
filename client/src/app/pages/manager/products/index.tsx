import { ButtonGroup, Td, Tr, useToast } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { Product, Role } from '../../../../domain'
import {
  If,
  NavButton,
  Page,
  PageBody,
  PageHeader,
  ProductTable,
  RemoveProductButton,
  useProducts,
  useRemoveProduct
} from '../../../../web'
import { makeRemoveProductById } from '../../../factories'
import {
  useAuthorization,
  useQueryProducts,
  useSignedUser
} from '../../../hooks'

export function ProductsPage() {
  const notify = useToast()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { products, isLoading } = useProducts({
    useData: () => useQueryProducts(),
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
          isLoading={isLoading}
          renderRow={(product: Product, index: number) => (
            <Tr key={index}>
              <Td>{product.name}</Td>
              <Td isNumeric>
                <ButtonGroup>
                  <NavButton
                    onNavigate={() =>
                      navigate(`/manager/products/${product.id}`)
                    }
                  >
                    Abrir
                  </NavButton>
                  <If condition={isSigned}>
                    <RemoveProductButton
                      isRemoving={isRemoving}
                      onRemove={() => removeProduct(product)}
                      isDisabled={!isAuthorized}
                    />
                  </If>
                </ButtonGroup>
              </Td>
            </Tr>
          )}
        />
      </PageBody>
    </Page>
  )
}
