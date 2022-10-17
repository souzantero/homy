import { useEffect, useState } from 'react'
import { Product, UpdateProductById } from '../../../domain'
import { Notify } from '../../../presentation'

export interface UseUpdateProductOptions {
  updateProductById: UpdateProductById
  useProduct: () => { product?: Product; isLoading: boolean }
  onNotify: Notify
  onUpdated: (product: Product) => void
}

export function useUpdateProduct(
  productId: string,
  {
    updateProductById,
    useProduct,
    onUpdated,
    onNotify
  }: UseUpdateProductOptions
): {
  name: string
  setName: (name: string) => void
  isUpdating: boolean
  isLoading: boolean
  updateProduct: () => Promise<Product | undefined>
} {
  const { product, isLoading } = useProduct()

  const [name, setName] = useState<string>('')
  const [isUpdating, setIsUpdating] = useState(false)

  const updateProduct = async () => {
    try {
      setIsUpdating(true)
      const updatedProduct = await updateProductById.update(productId, { name })
      setName('')

      onNotify({
        status: 'success',
        title: 'Produto atualizado.',
        description: 'Produto atualizado com sucesso.'
      })

      onUpdated(updatedProduct)
      return updatedProduct
    } catch (error) {
      const status = 'error'
      const title = 'Falha ao atualizar produto.'
      const description =
        error instanceof Error
          ? error.message
          : 'Não foi possível atualizar o produto no momento, tente novamente mais tarde.'
      onNotify({ status, title, description })
    } finally {
      setIsUpdating(false)
    }
  }

  useEffect(() => {
    if (product) {
      setName(product.name)
    }
  }, [product])

  return { name, setName, isLoading, isUpdating, updateProduct }
}
