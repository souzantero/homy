import { useState } from 'react'
import { Notify } from '../../../presentation'
import { RefreshUserEmailConfirmationCode } from '../../../domain'

export interface UseRefreshUserEmailConfirmationCodeOptions {
  refreshUserEmailConfirmationCode: RefreshUserEmailConfirmationCode
  onNotify: Notify
}

export function useRefreshUserEmailConfirmationCode({
  refreshUserEmailConfirmationCode,
  onNotify
}: UseRefreshUserEmailConfirmationCodeOptions): {
  isRefreshing: boolean
  refresh: (email: string) => Promise<void>
} {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const refresh = async (email: string) => {
    try {
      setIsRefreshing(true)

      await refreshUserEmailConfirmationCode.refresh(email)

      onNotify({
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
      onNotify({ status, title, description })
    } finally {
      setIsRefreshing(false)
    }
  }

  return {
    isRefreshing,
    refresh
  }
}
