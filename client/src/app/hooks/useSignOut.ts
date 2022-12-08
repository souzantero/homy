import { useToast } from '@chakra-ui/react'
import { useState } from 'react'
import { makeSignOut } from '../factories'
import { useSignedUser } from './useSignedUser'

type Options = {
  onSignedOut?: () => void
}

export function useSignOut({ onSignedOut }: Options): {
  isSigningOut: boolean
  signOut: () => Promise<void>
} {
  const notify = useToast()
  const { signedUser } = useSignedUser()
  const [isSigningOut, setIsSigningOut] = useState(false)

  const signOut = async () => {
    try {
      setIsSigningOut(true)
      const signOut = makeSignOut(signedUser!)
      await signOut.signOut()
      notify({
        status: 'success',
        title: 'Desconectado.',
        description: 'Desconexão realizada com sucesso.'
      })

      if (onSignedOut) {
        onSignedOut()
      }
    } catch (error) {
      const status = 'error'
      const title = 'Falha ao desconectar da sua conta.'
      const description =
        error instanceof Error
          ? error.message
          : 'Não foi possível desconectar da sua conta no momento, tente novamente mais tarde.'
      notify({ status, title, description })
    } finally {
      setIsSigningOut(false)
    }
  }

  return {
    isSigningOut,
    signOut
  }
}
