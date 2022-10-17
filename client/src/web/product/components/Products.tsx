import { ButtonGroup } from '@chakra-ui/react'
import { Product, Role } from '../../../domain'
import { Authorization, Signed } from '../../auth'
import { NavButton, Page, PageBody, PageHeader } from '../../layout'
import { ProductTable } from './ProductTable'

export interface ProductsProps {
  products: Product[]
  isLoading: boolean
  isRemoving: boolean
  onAddNew: () => void
  onShowProduct: (product: Product) => void
  onRemoveProduct: (product: Product) => Promise<boolean>
}

export function Products({
  products,
  isLoading,
  isRemoving,
  onAddNew,
  onShowProduct,
  onRemoveProduct
}: ProductsProps) {
  return (
    <Page>
      <PageHeader title="Produtos">
        <ButtonGroup>
          <Signed>
            <Authorization roles={[Role.Admin]} disable>
              <NavButton onNavigate={onAddNew}>Adicionar</NavButton>
            </Authorization>
          </Signed>
        </ButtonGroup>
      </PageHeader>
      <PageBody>
        <ProductTable
          products={products}
          isLoading={isLoading}
          isRemoving={isRemoving}
          onShowProduct={onShowProduct}
          onRemoveProduct={onRemoveProduct}
        />
      </PageBody>
    </Page>
  )
}
