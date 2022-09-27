import { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { SignIn } from '../../domain/services/sign-in'
import { makeSignIn } from '../factories/sign-in-factory'

export type Result = {
  isSigning: boolean
  signIn: (
    params: SignIn.Params,
    options: SignInOptions
  ) => Promise<SignIn.Result | undefined>
}

export type SignInOptions = {
  remind: boolean
}

export function useSignIn(): Result {
  const notify = useToast()
  const [isSigning, setIsSigning] = useState(false)

  const signIn = async (params: SignIn.Params, { remind }: SignInOptions) => {
    try {
      setIsSigning(true)

      const signIn = makeSignIn(remind)
      const signedUser = await signIn.signIn(params)

      notify({
        status: 'success',
        title: 'Conectado.',
        description: 'Conexão realizada com sucesso.'
      })

      return signedUser
    } catch (error) {
      const status = 'error'
      const title = 'Falha ao conectar-se a sua conta.'
      const description =
        error instanceof Error
          ? error.message
          : 'Não foi possível conectar-se a sua conta no momento, tente novamente mais tarde.'
      notify({ status, title, description })
    } finally {
      setIsSigning(false)
    }
  }

  return { isSigning, signIn }
}
