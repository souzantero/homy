import { Product } from '../../../domain'
import { Page, PageHeader, PageBody } from '../layout'
import { ProductForm } from './ProductForm'

export interface EditProductProps {
  name: string
  isLoading: boolean
  isUpdating: boolean
  onChangeName: (value: string) => void
  onUpdate: () => Promise<Product | undefined>
}

export function EditProduct({
  name,
  isLoading,
  isUpdating,
  onChangeName,
  onUpdate
}: EditProductProps) {
  return (
    <Page>
      <PageHeader title="Editar produto" />
      <PageBody>
        <ProductForm
          value={{ name }}
          onChange={(data) => onChangeName(data.name)}
          onSubmit={onUpdate}
          isDisabled={isLoading || isUpdating}
          isLoading={isLoading || isUpdating}
          buttonText="Salvar"
          buttonLoadingText="Salvando..."
        />
      </PageBody>
    </Page>
  )
}
