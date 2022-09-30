import { useParams } from 'react-router-dom'
import { Page, PageHeader, PageBody } from '../../layout'
import { useUpdateProduct } from '../hooks'
import { ProductForm } from './ProductForm'

export function EditProduct() {
  const { productId } = useParams()
  const { name, setName, isLoading, updateProduct, isUpdating } =
    useUpdateProduct(productId || '')
  return (
    <Page>
      <PageHeader title="Editar produto" />
      <PageBody>
        <ProductForm
          value={{ name }}
          onChange={(data) => setName(data.name)}
          onSubmit={updateProduct}
          isDisabled={isLoading || isUpdating}
          isLoading={isLoading || isUpdating}
          buttonText="Salvar"
          buttonLoadingText="Salvando..."
        />
      </PageBody>
    </Page>
  )
}
