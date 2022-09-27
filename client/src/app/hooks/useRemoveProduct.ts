import { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { Product } from '@retailer/client/domain'
import { makeRemoveProductById } from '../factories/remove-product-by-id-factory'
import { useSignedUser } from './useSignedUser'

export function useRemoveProduct(): {
  isRemoving: boolean
  removeProduct: (product: Product) => Promise<boolean>
} {
  const notify = useToast()
  const queryClient = useQueryClient()
  const { signedUser } = useSignedUser()
  const [isRemoving, setIsRemoving] = useState(false)

  const removeProduct = async (product: Product) => {
    try {
      setIsRemoving(true)

      const removeProductById = makeRemoveProductById(signedUser!)
      await removeProductById.remove(product.id)

      notify({
        status: 'success',
        title: 'Produto removido.',
        description: 'Produto removido com sucesso.'
      })

      queryClient.invalidateQueries(['products'])
      return true
    } catch (error) {
      const status = 'error'
      const title = 'Falha ao remover produto.'
      const description =
        error instanceof Error
          ? error.message
          : 'Não foi possível remover o produto no momento, tente novamente mais tarde.'
      notify({ status, title, description })
      return false
    } finally {
      setIsRemoving(false)
    }
  }

  return { isRemoving, removeProduct }
}
