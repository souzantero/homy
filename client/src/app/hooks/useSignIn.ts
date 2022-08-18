import { useState } from "react"
import { SignIn } from "../../domain/usecases/sign-in"
import { UserLocalStorageRepository } from "../../infra/repositories/local-storage/user-local-storage-repository"
import { useNotifier } from "./useNotifier"
import { useRepository } from "./useRepository"

export type Result = {
  isSigning: boolean
  signIn: (params: SignIn.Params) => Promise<SignIn.Result | undefined>
}

export function useSignIn(): Result {
  const { notify } = useNotifier()
  const [isSigning, setIsSigning] = useState(false)
  const repository = useRepository()

  const signIn = async (params: SignIn.Params) => {
    try {
      setIsSigning(true)

      const signIn = new SignIn(repository.auth, new UserLocalStorageRepository())
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