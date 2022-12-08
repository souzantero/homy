import { useToast } from '@chakra-ui/react'
import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ConfirmUserEmail } from '../../../web'
import {
  makeConfirmUserEmailRepository,
  makeRefreshUserEmailConfirmationCodeRepository
} from '../../factories'

export function ConfirmUserEmailPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const notify = useToast()
  const email = useMemo(() => searchParams.get('email') || '', [searchParams])
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [confirmationCode, setConfirmationCode] = useState<string>('')

  const confirm = async (email: string) => {
    try {
      setIsConfirming(true)

      const repository = makeConfirmUserEmailRepository()
      await repository.confirmUserEmail({
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

  const refresh = async (email: string) => {
    try {
      setIsRefreshing(true)

      const repository = makeRefreshUserEmailConfirmationCodeRepository()
      await repository.refreshUserEmailConfirmationCode(email)

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

  return (
    <ConfirmUserEmail
      email={email}
      confirmationCode={confirmationCode}
      onChangeConfirmationCode={setConfirmationCode}
      onConfirm={confirm}
      isConfirming={isConfirming}
      onRefresh={refresh}
      isRefreshing={isRefreshing}
    />
  )
}
