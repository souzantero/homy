import { useToast } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { useProducts } from '../../web'
import { makeLoadProducts } from '../factories'

export function useAllProducts() {
  const notify = useToast()
  const loadProducts = makeLoadProducts()
  return useProducts({
    useData: () => {
      const { data, isLoading, error } = useQuery(
        ['products'],
        () => loadProducts.load(),
        {
          refetchOnWindowFocus: true
        }
      )

      const products = data || []

      return {
        products,
        isLoading,
        error
      }
    },
    onNotify: notify
  })
}
