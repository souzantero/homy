import { useEffect } from 'react'
import { useToast } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { Product } from '@retailer/client/domain'
import { makeLoadProductById } from '../factories/load-product-by-id-factory'

export function useProduct(productId: string): {
  product?: Product
  isLoading: boolean
} {
  const notify = useToast()
  const loadProductById = makeLoadProductById()
  const {
    data: product,
    isLoading,
    error
  } = useQuery(
    [`products/${productId}`],
    () => loadProductById.load(productId),
    {
      refetchOnWindowFocus: true
    }
  )

  useEffect(() => {
    if (error) {
      const description = error instanceof Error ? error.message : ''

      notify({
        status: 'error',
        title: 'Falha ao buscar o produto.',
        description
      })
    }
  }, [error])

  return { product, isLoading }
}
