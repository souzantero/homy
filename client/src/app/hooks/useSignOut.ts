import { useToast } from '@chakra-ui/react'
import { useState } from 'react'
import { makeSignOut } from '../factories/sign-out-factory'
import { useSignedUser } from './useSignedUser'

export type Result = {
  isSigningOut: boolean
  signOut: () => Promise<void>
}

export function useSignOut(): Result {
  const notify = useToast()
  const [isSigningOut, setIsSigningOut] = useState(false)
  const { signedUser } = useSignedUser()

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

      window.location.reload()
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
