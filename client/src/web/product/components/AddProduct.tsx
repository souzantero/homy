import { Product } from '../../../domain'
import { Page, PageHeader, PageBody } from '../../layout'
import { ProductForm } from './ProductForm'

export interface AddProductProps {
  name: string
  isAdding: boolean
  onChangeName: (value: string) => void
  onAdd: () => Promise<Product | undefined>
}

export function AddProduct({
  name,
  isAdding,
  onChangeName,
  onAdd
}: AddProductProps) {
  return (
    <Page>
      <PageHeader title="Adicionar produto" />
      <PageBody>
        <ProductForm
          value={{ name }}
          onChange={(data) => onChangeName(data.name)}
          onSubmit={onAdd}
          isDisabled={isAdding}
          isLoading={isAdding}
        />
      </PageBody>
    </Page>
  )
}
