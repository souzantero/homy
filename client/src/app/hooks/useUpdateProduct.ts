import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { Product } from '@retailer/client/domain'
import { makeUpdateProductById } from '../factories/update-product-by-id-factory'
import { useSignedUser } from './useSignedUser'
import { useProduct } from './useProduct'

export function useUpdateProduct(productId: string): {
  name: string
  setName: (name: string) => void
  isUpdating: boolean
  isLoading: boolean
  updateProduct: () => Promise<Product | undefined>
} {
  const navigate = useNavigate()
  const notify = useToast()
  const queryClient = useQueryClient()
  const { signedUser } = useSignedUser()
  const { product, isLoading } = useProduct(productId)

  const [name, setName] = useState<string>('')
  const [isUpdating, setIsUpdating] = useState(false)

  const updateProduct = async () => {
    try {
      setIsUpdating(true)

      const updateProductById = makeUpdateProductById(signedUser!)
      const updatedProduct = await updateProductById.update(productId, { name })
      setName('')

      notify({
        status: 'success',
        title: 'Produto atualizado.',
        description: 'Produto atualizado com sucesso.'
      })

      queryClient.invalidateQueries(['products'])
      navigate('/products')

      return updatedProduct
    } catch (error) {
      const status = 'error'
      const title = 'Falha ao atualizar produto.'
      const description =
        error instanceof Error
          ? error.message
          : 'Não foi possível atualizar o produto no momento, tente novamente mais tarde.'
      notify({ status, title, description })
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
