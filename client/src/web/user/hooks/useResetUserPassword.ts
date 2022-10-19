import { useState } from 'react'
import { ResetUserPassword } from '../../../domain'
import { Notify } from '../../../presentation'
export interface UseResetUserPasswordOptions {
  resetUserPasswordFactory: () => ResetUserPassword
  onReseted: () => void
  onNotify: Notify
}

export function useResetUserPassword({
  resetUserPasswordFactory,
  onReseted,
  onNotify
}: UseResetUserPasswordOptions): {
  newPassword: string
  setNewPassword: (value: string) => void
  confirmedPassword: string
  setConfirmedPassword: (value: string) => void
  reset: () => Promise<void>
  isResetting: boolean
} {
  const [newPassword, setNewPassword] = useState('')
  const [confirmedPassword, setConfirmedPassword] = useState('')
  const [isResetting, setIsResetting] = useState(false)

  const reset = async () => {
    try {
      setIsResetting(true)

      const resetUserPassword = resetUserPasswordFactory()
      await resetUserPassword.reset({
        newPassword,
        confirmedPassword
      })

      setNewPassword('')
      setConfirmedPassword('')

      onNotify({
        status: 'success',
        title: 'Senha esquecida.',
        description: 'Verifique sua caixa de entrada para ver as instruções.'
      })

      onReseted()
    } catch (error) {
      const status = 'error'
      const title = 'Falha ao esquecer senha.'
      const description =
        error instanceof Error
          ? error.message
          : 'Não foi possível esquecer a senha no momento, tente novamente mais tarde.'
      onNotify({ status, title, description })
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
