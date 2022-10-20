import { useState } from 'react'
import { Notify } from '../../presentation'
import { ConfirmUserEmail } from '../../domain'

export interface UseConfirmUserEmailOptions {
  confirmUserEmail: ConfirmUserEmail
  onConfirmed: () => void
  onNotify: Notify
}

export function useConfirmUserEmail({
  confirmUserEmail,
  onConfirmed,
  onNotify
}: UseConfirmUserEmailOptions): {
  confirmationCode: string
  setConfirmationCode: (value: string) => void
  isConfirming: boolean
  confirm: (email: string) => Promise<boolean>
} {
  const [isConfirming, setIsConfirming] = useState(false)

  const [confirmationCode, setConfirmationCode] = useState<string>('')

  const confirm = async (email: string) => {
    try {
      setIsConfirming(true)
      await confirmUserEmail.confirm({
        email,
        confirmationCode
      })

      setConfirmationCode('')

      onNotify({
        status: 'success',
        title: 'Confirmado.',
        description: 'E-mail da conta confirmado com sucesso.'
      })

      onConfirmed()

      return true
    } catch (error) {
      const status = 'error'
      const title = 'Falha ao confirmar e-mail.'
      const description =
        error instanceof Error
          ? error.message
          : 'Não foi possível confirmar o e-mail a sua conta no momento, tente novamente mais tarde.'
      onNotify({ status, title, description })
    } finally {
      setIsConfirming(false)
    }

    return false
  }

  return {
    confirmationCode,
    setConfirmationCode,
    isConfirming,
    confirm
  }
}
