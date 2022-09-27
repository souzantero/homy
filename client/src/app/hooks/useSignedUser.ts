import { useToast } from '@chakra-ui/react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { User } from '../../domain/models/user'
import { makeLoadSignedUser } from '../factories/load-signed-user-factory'
import { makeSignMe } from '../factories/sign-me-factory'

export type Result = {
  signedUser?: User | null
  isLoading: boolean
}

export function useSignedUser(): Result {
  const notify = useToast()
  const loadSignedUser = makeLoadSignedUser()

  const queryClient = useQueryClient()

  const {
    data: signedUser,
    isLoading,
    error
  } = useQuery(['signed-user'], () => loadSignedUser.load(), {
    refetchOnWindowFocus: true
  })

  useQuery(['signed-me'], () => {
    if (signedUser) {
      makeSignMe(signedUser, false)
        .signMe()
        .then(() => {
          queryClient.invalidateQueries(['signed-user'])
        })
    }
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
