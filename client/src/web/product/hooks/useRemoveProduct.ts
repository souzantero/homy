import { useState } from 'react'
import { Product, RemoveProductById } from '../../../domain'
import { Notify } from '../../../presentation'

export interface UseRemoveProductOptions {
  removeProductById: RemoveProductById
  onRemoved: () => void
  onNotify: Notify
}

export function useRemoveProduct({
  removeProductById,
  onRemoved,
  onNotify
}: UseRemoveProductOptions): {
  isRemoving: boolean
  removeProduct: (product: Product) => Promise<boolean>
} {
  const [isRemoving, setIsRemoving] = useState(false)

  const removeProduct = async (product: Product) => {
    try {
      setIsRemoving(true)
      await removeProductById.remove(product.id)

      onNotify({
        status: 'success',
        title: 'Produto removido.',
        description: 'Produto removido com sucesso.'
      })

      onRemoved()

      return true
    } catch (error) {
      const status = 'error'
      const title = 'Falha ao remover produto.'
      const description =
        error instanceof Error
          ? error.message
          : 'Não foi possível remover o produto no momento, tente novamente mais tarde.'
      onNotify({ status, title, description })
      return false
    } finally {
      setIsRemoving(false)
    }
  }

  return { isRemoving, removeProduct }
}
