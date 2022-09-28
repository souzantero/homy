import { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { makeForgetUserPassword } from '../factories'

export function useForgetUserPassword(): {
  email: string
  setEmail: (value: string) => void
  isForgetting: boolean
  forget: () => Promise<void>
} {
  const notify = useToast()

  const [email, setEmail] = useState('')
  const [isForgetting, setIsForgetting] = useState(false)

  const forget = async () => {
    try {
      setIsForgetting(true)

      const forgetUserPassword = makeForgetUserPassword()
      await forgetUserPassword.forget({ email })

      setEmail('')

      notify({
        status: 'success',
        title: 'Senha esquecida.',
        description: 'Verifique sua caixa de entrada para ver as instruções.'
      })
    } catch (error) {
      const status = 'error'
      const title = 'Falha ao esquecer senha.'
      const description =
        error instanceof Error
          ? error.message
          : 'Não foi possível esquecer a senha no momento, tente novamente mais tarde.'
      notify({ status, title, description })
    } finally {
      setIsForgetting(false)
    }
  }

  return {
    email,
    setEmail,
    isForgetting,
    forget
  }
}
