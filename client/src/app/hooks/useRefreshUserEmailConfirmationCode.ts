import { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { makeRefreshUserEmailConfirmationCode } from '../factories/refresh-user-email-confirmation-code-factory'

export function useRefreshUserEmailConfirmationCode(): {
  isRefreshing: boolean
  refresh: (email: string) => Promise<void>
} {
  const notify = useToast()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const refresh = async (email: string) => {
    try {
      setIsRefreshing(true)

      const refreshUserEmailConfirmationCode =
        makeRefreshUserEmailConfirmationCode()
      await refreshUserEmailConfirmationCode.refresh(email)

      notify({
        status: 'success',
        title: 'Código de confirmação atualizado com sucesso.',
        description:
          'Aguarde alguns segundos e verifique a caixa de entrada do seu e-mail'
      })
    } catch (error) {
      const status = 'error'
      const title = 'Falha ao atualizar.'
      const description =
        error instanceof Error
          ? error.message
          : 'Não foi possível atualizar o código de confirmação de e-mail no momento, tente novamente mais tarde.'
      notify({ status, title, description })
    } finally {
      setIsRefreshing(false)
    }
  }

  return {
    isRefreshing,
    refresh
  }
}
