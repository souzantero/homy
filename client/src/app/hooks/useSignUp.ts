import { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { makeSignUpService } from '../factories/sign-up-service-factory'
import { SignUpService } from '../../domain/services/sign-up-service'

export type Result = {
  isSigning: boolean
  signUp: (
    params: SignUpService.Params
  ) => Promise<SignUpService.Result | undefined>
}

export function useSignUp(): Result {
  const notify = useToast()
  const [isSigning, setIsSigning] = useState(false)

  const signUp = async (params: SignUpService.Params) => {
    try {
      setIsSigning(true)

      const signUp = makeSignUpService()
      const signedUser = await signUp.signUp(params)

      notify({
        status: 'success',
        title: 'Cadastrado.',
        description: 'Cadastro realizado com sucesso.'
      })

      return signedUser
    } catch (error) {
      const status = 'error'
      const title = 'Falha ao cadastrar-se.'
      const description =
        error instanceof Error
          ? error.message
          : 'Não foi possível cadastrar a sua conta no momento, tente novamente mais tarde.'
      notify({ status, title, description })
    } finally {
      setIsSigning(false)
    }
  }

  return { isSigning, signUp }
}
