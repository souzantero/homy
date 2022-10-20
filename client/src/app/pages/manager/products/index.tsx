import { ButtonGroup, Td, Tr, useToast } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { Product, Role } from '../../../../domain'
import {
  NavButton,
  Page,
  PageBody,
  PageHeader,
  ProductTable,
  RemoveProductButton,
  useProducts,
  useRemoveProduct
} from '../../../../web'
import { Authorization, Signed } from '../../../components'
import { makeRemoveProductById } from '../../../factories'
import { useQueryProducts, useSignedUser } from '../../../hooks'

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

  return (
    <Page>
      <PageHeader title="Produtos">
        <ButtonGroup>
          <Signed>
            <Authorization roles={[Role.Admin]} disable>
              <NavButton onNavigate={() => navigate('/manager/products/new')}>
                Adicionar
              </NavButton>
            </Authorization>
          </Signed>
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
                  <Signed>
                    <Authorization roles={[Role.Admin]} disable>
                      <RemoveProductButton
                        isRemoving={isRemoving}
                        onRemove={() => removeProduct(product)}
                      />
                    </Authorization>
                  </Signed>
                </ButtonGroup>
              </Td>
            </Tr>
          )}
        />
      </PageBody>
    </Page>
  )
}
