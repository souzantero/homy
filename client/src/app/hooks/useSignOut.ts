import { useToast } from "@chakra-ui/react"
import { useState } from "react"
import { makeSignOutService } from "../factories/sign-out-service-factory"

export type Result = {
  isSigningOut: boolean,
  signOut: () => Promise<void>
}

export function useSignOut(): Result {
  const notify = useToast()
  const [isSigningOut, setIsSigningOut] = useState(false)

  const signOut = async () => {
    try {
      setIsSigningOut(true)
      const signOut = makeSignOutService()
      await signOut.signOut()
      notify({
        status: 'success',
        title: 'Desconectado.',
        description: "Desconexão realizada com sucesso.",
      })

      window.location.reload()
    } catch (error) {
      const status = 'error'
      const title = 'Falha ao desconectar da sua conta.'
      const description = error instanceof Error ? error.message : 'Não foi possível desconectar da sua conta no momento, tente novamente mais tarde.'
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