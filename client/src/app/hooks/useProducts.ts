import { useToast } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Product } from '../../domain/models/product'
import { makeLoadProducts } from '../factories/load-products-factory'

export type Result = {
  isLoading: boolean
  error?: any
  products: Product[]
}

export function useProducts(): Result {
  const notify = useToast()
  const loadProducts = makeLoadProducts()
  const { data, isLoading, error } = useQuery(
    ['products'],
    () => loadProducts.load(),
    {
      refetchOnWindowFocus: true
    }
  )

  const products = data || []

  useEffect(() => {
    if (error) {
      const description = error instanceof Error ? error.message : ''

      notify({
        status: 'error',
        title: 'Falha ao buscar produtos.',
        description
      })
    }
  }, [error])

  return { isLoading, products, error }
}
