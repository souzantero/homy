import { useToast } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Supply } from '../../domain'
import { makeLoadSupplyByIdRepository } from '../factories'

export function useSupply(supplyId: string): {
  supply?: Supply
  isLoading: boolean
} {
  const notify = useToast()
  const repository = makeLoadSupplyByIdRepository()
  const {
    data: supply,
    isLoading,
    error
  } = useQuery(
    [`supplies/${supplyId}`],
    () => repository.loadOneById(supplyId),
    {
      refetchOnWindowFocus: true
    }
  )

  useEffect(() => {
    if (error) {
      const description = error instanceof Error ? error.message : ''

      notify({
        status: 'error',
        title: 'Falha ao buscar o suprimentop.',
        description
      })
    }
  }, [error])

  return { supply, isLoading }
}
