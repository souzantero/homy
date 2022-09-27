import { useToast } from '@chakra-ui/react'
import { useState } from 'react'
import { ConfirmUserEmail } from '../../domain/services/confirm-user-email'
import { makeConfirmUserEmail } from '../factories/confirm-user-email-factory'

export type Result = {
  isConfirming: boolean
  confirm: (params: ConfirmUserEmail.Params) => Promise<boolean>
}

export function useConfirmUserEmail(): Result {
  const notify = useToast()
  const [isConfirming, setIsConfirming] = useState(false)

  const confirm = async (params: ConfirmUserEmail.Params) => {
    try {
      setIsConfirming(true)
      const confirmUserEmail = makeConfirmUserEmail()
      await confirmUserEmail.confirm(params)

      notify({
        status: 'success',
        title: 'Confirmado.',
        description: 'E-mail da conta confirmado com sucesso.'
      })

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
    isConfirming,
    confirm
  }
}
