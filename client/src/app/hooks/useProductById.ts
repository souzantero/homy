import { useToast } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { useProduct } from '../../web'
import { makeLoadProductById } from '../factories'

export function useProductById(productId: string) {
  const notify = useToast()
  const loadProductById = makeLoadProductById()

  return useProduct({
    useData: () => {
      const { data, isLoading, error } = useQuery(
        [`products/${productId}`],
        () => loadProductById.load(productId),
        {
          refetchOnWindowFocus: true
        }
      )

      return { product: data, isLoading, error }
    },
    onNotify: notify
  })
}
