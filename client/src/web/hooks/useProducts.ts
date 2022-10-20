import { useEffect } from 'react'
import { Product } from '../../domain'
import { Notify } from '../../presentation'

export interface UseProductsOptions {
  useData: () => { products: Product[]; isLoading: boolean; error?: unknown }
  onNotify: Notify
}

export function useProducts({ useData, onNotify }: UseProductsOptions): {
  isLoading: boolean
  error?: unknown
  products: Product[]
} {
  const { products, isLoading, error } = useData()

  useEffect(() => {
    if (error) {
      const description = error instanceof Error ? error.message : ''

      onNotify({
        status: 'error',
        title: 'Falha ao buscar produtos.',
        description
      })
    }
  }, [error])

  return { isLoading, products, error }
}
