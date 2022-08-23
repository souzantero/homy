import { useToast } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { User } from '../../domain/models/user'
import { makeLoadSignedUserService } from '../factories/load-signed-user-service-factory'

export type Result = {
  signedUser?: User | null
  isLoading: boolean
}

export function useSignedUser(): Result {
  const notify = useToast()
  const loadSignedUser = makeLoadSignedUserService()
  const {
    data: signedUser,
    isLoading,
    error
  } = useQuery(['signed-user'], () => loadSignedUser.load(), {
    refetchOnWindowFocus: true
  })

  useEffect(() => {
    if (error) {
      const description = error instanceof Error ? error.message : ''

      notify({
        status: 'error',
        title: 'Falha ao buscar o usuário autenticado.',
        description
      })
    }
  }, [error])

  return { signedUser, isLoading }
}
