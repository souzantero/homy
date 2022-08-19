import { useState } from "react"
import { useToast } from "@chakra-ui/react"
import { SignIn } from "../../domain/services/sign-in"
import { SignedUserLocalStorageRepository } from "../../infra/repositories/local-storage/signed-user-local-storage-repository"
import { useRepository } from "./useRepository"

export type Result = {
  isSigning: boolean
  signIn: (params: SignIn.Params) => Promise<SignIn.Result | undefined>
}

export function useSignIn(): Result {
  const notify = useToast()
  const [isSigning, setIsSigning] = useState(false)
  const repository = useRepository()

  const signIn = async (params: SignIn.Params) => {
    try {
      setIsSigning(true)

      const signIn = new SignIn(repository.auth, new SignedUserLocalStorageRepository())
      const signedUser = await signIn.signIn(params)

      notify({
        status: 'success',
        title: 'Conectado.',
        description: "Conexão realizada com sucesso.",
      })

      return signedUser
    } catch (error) {
      const status = 'error'
      const title = 'Falha ao conectar-se a sua conta.'
      const description = error instanceof Error ? error.message : 'Não foi possível conectar-se a sua conta no momento, tente novamente mais tarde.'
      notify({ status, title, description })
    } finally {
      setIsSigning(false)
    }
  }

  return { isSigning, signIn }
}