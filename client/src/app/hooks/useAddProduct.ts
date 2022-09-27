import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { Product } from '../../domain/models/product'
import { useToast } from '@chakra-ui/react'
import { makeAddProduct } from '../factories/add-product-factory'
import { AddProduct } from '../../domain/services/add-product'
import { useSignedUser } from './useSignedUser'

export type Result = {
  isAdding: boolean
  addProduct: (params: AddProduct.Params) => Promise<Product | undefined>
}

export function useAddProduct(): Result {
  const notify = useToast()
  const queryClient = useQueryClient()
  const { signedUser } = useSignedUser()
  const [isAdding, setIsAdding] = useState(false)

  const addProduct = async (params: AddProduct.Params) => {
    try {
      setIsAdding(true)
      const createProduct = makeAddProduct(signedUser!)
      const product = await createProduct.add(params)

      notify({
        status: 'success',
        title: 'Produto adicionado.',
        description: 'Produto adicionado com sucesso.'
      })

      queryClient.invalidateQueries(['products'])

      return product
    } catch (error) {
      const status = 'error'
      const title = 'Falha ao adicionar produto.'
      const description =
        error instanceof Error
          ? error.message
          : 'Não foi possível adicionar o produto no momento, tente novamente mais tarde.'
      notify({ status, title, description })
    } finally {
      setIsAdding(false)
    }
  }

  return { isAdding, addProduct }
}
