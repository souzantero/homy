import { useState } from 'react'
import { Notify } from '../../../presentation'
import { ForgetUserPassword } from '../../../domain'

export interface UseForgetUserPasswordOptions {
  forgetUserPassword: ForgetUserPassword
  onNotify: Notify
}

export function useForgetUserPassword({
  forgetUserPassword,
  onNotify
}: UseForgetUserPasswordOptions): {
  email: string
  setEmail: (value: string) => void
  isForgetting: boolean
  forget: () => Promise<void>
} {
  const [email, setEmail] = useState('')
  const [isForgetting, setIsForgetting] = useState(false)

  const forget = async () => {
    try {
      setIsForgetting(true)

      await forgetUserPassword.forget({ email })

      setEmail('')

      onNotify({
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
      onNotify({ status, title, description })
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
