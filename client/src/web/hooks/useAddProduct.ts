import { useState } from 'react'
import { AddProduct, Product } from '../../domain'
import { Notify } from '../../presentation'

export interface UseAddProductOptions {
  action: AddProduct
  onAdded: (product: Product) => void
  onNotify: Notify
}

export function useAddProduct({
  action,
  onAdded,
  onNotify
}: UseAddProductOptions): {
  name: string
  setName: (name: string) => void
  isAdding: boolean
  addProduct: () => Promise<Product | undefined>
} {
  const [name, setName] = useState<string>('')
  const [isAdding, setIsAdding] = useState(false)

  const addProduct = async () => {
    try {
      setIsAdding(true)
      const product = await action.add({ name })
      setName('')

      onNotify({
        status: 'success',
        title: 'Produto adicionado.',
        description: 'Produto adicionado com sucesso.'
      })

      onAdded(product)

      return product
    } catch (error) {
      const status = 'error'
      const title = 'Falha ao adicionar produto.'
      const description =
        error instanceof Error
          ? error.message
          : 'Não foi possível adicionar o produto no momento, tente novamente mais tarde.'
      onNotify({ status, title, description })
    } finally {
      setIsAdding(false)
    }
  }

  return {
    name,
    setName,
    isAdding,
    addProduct
  }
}
