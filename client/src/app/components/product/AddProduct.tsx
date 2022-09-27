import { useAddProduct } from '../../hooks/useAddProduct'
import { Page } from '../layout/Page'
import { PageHeader } from '../layout/PageHeader'
import { PageBody } from '../layout/PageBody'
import { ProductForm } from './ProductForm'

export function AddProduct() {
  const { name, setName, addProduct, isAdding } = useAddProduct()
  return (
    <Page>
      <PageHeader title="Adicionar produto" />
      <PageBody>
        <ProductForm
          value={{ name }}
          onChange={(data) => setName(data.name)}
          onSubmit={addProduct}
          isDisabled={isAdding}
          isLoading={isAdding}
        />
      </PageBody>
    </Page>
  )
}
