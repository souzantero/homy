import { Page, PageHeader, PageBody } from '../../layout'
import { useAddProduct } from '../hooks'
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
