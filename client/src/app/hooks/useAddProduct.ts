import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { Product } from '../../domain/models/product'
import { useToast } from '@chakra-ui/react'
import { makeAddProduct } from '../factories/add-product-factory'
import { useSignedUser } from './useSignedUser'

export type Result = {
  name: string
  setName: (name: string) => void
  isAdding: boolean
  addProduct: () => Promise<Product | undefined>
}

export function useAddProduct(): Result {
  const notify = useToast()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { signedUser } = useSignedUser()
  const [name, setName] = useState<string>('')
  const [isAdding, setIsAdding] = useState(false)

  const addProduct = async () => {
    try {
      setIsAdding(true)
      const createProduct = makeAddProduct(signedUser!)
      const product = await createProduct.add({ name })
      setName('')

      notify({
        status: 'success',
        title: 'Produto adicionado.',
        description: 'Produto adicionado com sucesso.'
      })

      queryClient.invalidateQueries(['products'])
      navigate('/products')

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

  return {
    name,
    setName,
    isAdding,
    addProduct
  }
}
