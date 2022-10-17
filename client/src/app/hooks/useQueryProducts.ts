import { useQuery } from '@tanstack/react-query'
import { makeLoadProducts } from '../factories'

export function useQueryProducts() {
  const loadProducts = makeLoadProducts()
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
}
