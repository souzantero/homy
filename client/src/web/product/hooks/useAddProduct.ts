import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { useToast } from '@chakra-ui/react'
import { Product } from '../../../domain'
import { useSignedUser } from '../../auth'
import { makeAddProduct } from '../factories'

export function useAddProduct(): {
  name: string
  setName: (name: string) => void
  isAdding: boolean
  addProduct: () => Promise<Product | undefined>
} {
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
      navigate('/manager/products')

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
