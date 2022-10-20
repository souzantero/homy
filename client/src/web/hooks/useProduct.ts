import { useEffect } from 'react'
import { Product } from '../../domain'
import { Notify } from '../../presentation'

export interface UseProductOptions {
  useData: () => { product?: Product; isLoading: boolean; error: unknown }
  onNotify: Notify
}

export function useProduct({ useData, onNotify }: UseProductOptions): {
  product?: Product
  isLoading: boolean
} {
  const { product, isLoading, error } = useData()

  useEffect(() => {
    if (error) {
      const description = error instanceof Error ? error.message : ''

      onNotify({
        status: 'error',
        title: 'Falha ao buscar o produto.',
        description
      })
    }
  }, [error])

  return { product, isLoading }
}
