import { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { Product } from '../../domain/models/product'
import { makeUpdateProductById } from '../factories/update-product-by-id-factory'
import { useSignedUser } from './useSignedUser'

export type Result = {
  isUpdating: boolean
  updateProduct: (product: Product) => Promise<Product | undefined>
}

export function useUpdateProduct(): Result {
  const notify = useToast()
  const queryClient = useQueryClient()
  const { signedUser } = useSignedUser()
  const [isUpdating, setIsUpdating] = useState(false)

  const updateProduct = async (product: Product) => {
    try {
      setIsUpdating(true)
      const { id } = product
      const data = {
        name: product.name
      }

      const updateProductById = makeUpdateProductById(signedUser!)
      const updatedProduct = await updateProductById.update(id, data)

      notify({
        status: 'success',
        title: 'Produto atualizado.',
        description: 'Produto atualizado com sucesso.'
      })

      queryClient.invalidateQueries(['products'])

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

  return { isUpdating, updateProduct }
}
