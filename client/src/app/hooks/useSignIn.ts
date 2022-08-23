import { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { SignInService } from '../../domain/services/sign-in-service'
import { makeSignInService } from '../factories/sign-in-service-factory'

export type Result = {
  isSigning: boolean
  signIn: (
    params: SignInService.Params,
    options: SignInOptions
  ) => Promise<SignInService.Result | undefined>
}

export type SignInOptions = {
  remind: boolean
}

export function useSignIn(): Result {
  const notify = useToast()
  const [isSigning, setIsSigning] = useState(false)

  const signIn = async (
    params: SignInService.Params,
    { remind }: SignInOptions
  ) => {
    try {
      setIsSigning(true)

      const signIn = makeSignInService(remind)
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
