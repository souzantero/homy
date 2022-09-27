import { useParams } from 'react-router-dom'
import { Page } from '../layout/Page'
import { PageHeader } from '../layout/PageHeader'
import { PageBody } from '../layout/PageBody'
import { ProductForm } from './ProductForm'
import { useUpdateProduct } from '../../hooks/useUpdateProduct'

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
