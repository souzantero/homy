import { useEffect } from 'react'
import { useToast } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { makeLoadSuppliesRepository } from '../factories'

export function useSupplies() {
  const notify = useToast()
  const repository = makeLoadSuppliesRepository()

  const { data, isLoading, error } = useQuery(
    ['supplies'],
    () => repository.loadAll(),
    {
      refetchOnWindowFocus: true
    }
  )

  const supplies = data || []

  useEffect(() => {
    if (error) {
      const description = error instanceof Error ? error.message : ''

      notify({
        status: 'error',
        title: 'Falha ao buscar suprimentos.',
        description
      })
    }
  }, [error])

  return { isLoading, supplies, error }
}
