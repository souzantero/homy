import { useState } from 'react'
import { useAddProduct } from '../../hooks/useAddProduct'
import { useNavigate } from 'react-router-dom'
import { Page } from '../layout/Page'
import { PageHeader } from '../layout/PageHeader'
import { PageBody } from '../layout/PageBody'
import { ProductForm } from './ProductForm'

export function AddProduct() {
  const { addProduct, isAdding } = useAddProduct()
  const navigate = useNavigate()
  const [name, setName] = useState<string>('')

  const handleSubmit = async () => {
    const params = { name }
    const createdProduct = await addProduct(params)
    if (createdProduct) {
      clear()
      navigate('/products')
    }
  }

  const clear = () => {
    setName('')
  }

  return (
    <Page>
      <PageHeader title="Adicionar produto" />
      <PageBody>
        <ProductForm
          value={{ name }}
          onChange={(data) => {
            setName(data.name)
          }}
          onSubmit={handleSubmit}
          isDisabled={isAdding}
          isLoading={isAdding}
        />
      </PageBody>
    </Page>
  )
}
