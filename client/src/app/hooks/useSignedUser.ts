import { useEffect } from 'react'
import { useToast } from '@chakra-ui/react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { User } from '../../domain'
import { makeSignedUser, makeSignMe } from '../factories'

export function useSignedUser(): {
  signedUser?: User | null
  isLoading: boolean
  isSigned: boolean
} {
  const notify = useToast()
  const loadSignedUser = makeSignedUser()

  const queryClient = useQueryClient()

  const {
    data: signedUser,
    isLoading,
    error
  } = useQuery(['signed-user'], () => loadSignedUser.get(), {
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

  return { signedUser, isLoading, isSigned: Boolean(!isLoading && signedUser) }
}
