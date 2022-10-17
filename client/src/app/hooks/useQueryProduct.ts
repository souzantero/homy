import { useQuery } from '@tanstack/react-query'
import { Product } from '../../domain'
import { makeLoadProductById } from '../factories'

export function useQueryProduct(productId: string): {
  product?: Product
  isLoading: boolean
  error: unknown
} {
  const loadProductById = makeLoadProductById()
  const { data, isLoading, error } = useQuery(
    [`products/${productId}`],
    () => loadProductById.load(productId),
    {
      refetchOnWindowFocus: true
    }
  )

  return { product: data, isLoading, error }
}
