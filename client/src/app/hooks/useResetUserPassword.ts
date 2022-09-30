import { useToast } from '@chakra-ui/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { makeResetUserPassword } from '../factories/reset-user-password-factory'

export function useResetUserPassword(): {
  newPassword: string
  setNewPassword: (value: string) => void
  confirmedPassword: string
  setConfirmedPassword: (value: string) => void
  reset: (authorizationToken: string) => Promise<void>
  isResetting: boolean
} {
  const notify = useToast()
  const navigate = useNavigate()

  const [newPassword, setNewPassword] = useState('')
  const [confirmedPassword, setConfirmedPassword] = useState('')
  const [isResetting, setIsResetting] = useState(false)

  const reset = async (authorizationToken: string) => {
    try {
      setIsResetting(true)

      const resetUserPassword = makeResetUserPassword(authorizationToken)
      await resetUserPassword.reset({
        newPassword,
        confirmedPassword
      })

      setNewPassword('')
      setConfirmedPassword('')

      notify({
        status: 'success',
        title: 'Senha esquecida.',
        description: 'Verifique sua caixa de entrada para ver as instruções.'
      })

      navigate('/auth/sign-in')
    } catch (error) {
      const status = 'error'
      const title = 'Falha ao esquecer senha.'
      const description =
        error instanceof Error
          ? error.message
          : 'Não foi possível esquecer a senha no momento, tente novamente mais tarde.'
      notify({ status, title, description })
    } finally {
      setIsResetting(false)
    }
  }

  return {
    newPassword,
    setNewPassword,
    confirmedPassword,
    setConfirmedPassword,
    reset,
    isResetting
  }
}
