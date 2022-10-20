import { useState } from 'react'
import { SignOut } from '../../domain'
import { Notify } from '../../presentation'

export interface UseSignOutOptions {
  signOutFactory: () => SignOut
  onSignedOut: () => void
  onNotify: Notify
}

export function useSignOut({
  signOutFactory,
  onSignedOut,
  onNotify
}: UseSignOutOptions): {
  isSigningOut: boolean
  signOut: () => Promise<void>
} {
  const [isSigningOut, setIsSigningOut] = useState(false)

  const signOut = async () => {
    try {
      setIsSigningOut(true)
      const signOut = signOutFactory()
      await signOut.signOut()
      onNotify({
        status: 'success',
        title: 'Desconectado.',
        description: 'Desconexão realizada com sucesso.'
      })

      onSignedOut()
    } catch (error) {
      const status = 'error'
      const title = 'Falha ao desconectar da sua conta.'
      const description =
        error instanceof Error
          ? error.message
          : 'Não foi possível desconectar da sua conta no momento, tente novamente mais tarde.'
      onNotify({ status, title, description })
    } finally {
      setIsSigningOut(false)
    }
  }

  return {
    isSigningOut,
    signOut
  }
}
