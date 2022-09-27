import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Page } from '../layout/Page'
import { PageHeader } from '../layout/PageHeader'
import { PageBody } from '../layout/PageBody'
import { ProductForm } from './ProductForm'
import { useProduct } from '../../hooks/useProduct'
import { useUpdateProduct } from '../../hooks/useUpdateProduct'

export function EditProduct() {
  const { updateProduct, isUpdating } = useUpdateProduct()
  const navigate = useNavigate()
  const { productId } = useParams()

  const [name, setName] = useState<string>('')

  const { product, isLoading } = useProduct(productId || '')

  useEffect(() => {
    if (product) {
      setName(product.name)
    }
  }, [product])

  const handleSubmit = async () => {
    if (product) {
      product.name = name
      const updatedProduct = await updateProduct(product)
      if (updatedProduct) {
        clear()
        navigate('/products')
      }
    }
  }

  const clear = () => {
    setName('')
  }

  return (
    <Page>
      <PageHeader title="Editar produto" />
      <PageBody>
        <ProductForm
          value={{ name }}
          onChange={(data) => {
            setName(data.name)
          }}
          onSubmit={handleSubmit}
          isDisabled={isLoading || isUpdating}
          isLoading={isLoading || isUpdating}
          buttonText="Salvar"
          buttonLoadingText="Salvando..."
        />
      </PageBody>
    </Page>
  )
}
