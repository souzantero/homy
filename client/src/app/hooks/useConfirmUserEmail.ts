import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'
import { makeConfirmUserEmail } from '../factories/confirm-user-email-factory'

export function useConfirmUserEmail(email: string): {
  confirmationCode: string
  setConfirmationCode: (value: string) => void
  isConfirming: boolean
  confirm: () => Promise<boolean>
} {
  const navigate = useNavigate()
  const notify = useToast()
  const [isConfirming, setIsConfirming] = useState(false)

  const [confirmationCode, setConfirmationCode] = useState<string>('')

  const confirm = async () => {
    try {
      setIsConfirming(true)
      const confirmUserEmail = makeConfirmUserEmail()
      await confirmUserEmail.confirm({
        email,
        confirmationCode
      })

      setConfirmationCode('')

      notify({
        status: 'success',
        title: 'Confirmado.',
        description: 'E-mail da conta confirmado com sucesso.'
      })

      navigate('/')

      return true
    } catch (error) {
      const status = 'error'
      const title = 'Falha ao confirmar e-mail.'
      const description =
        error instanceof Error
          ? error.message
          : 'Não foi possível confirmar o e-mail a sua conta no momento, tente novamente mais tarde.'
      notify({ status, title, description })
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
