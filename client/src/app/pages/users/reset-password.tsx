import { useToast } from '@chakra-ui/react'
import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ResetUserPassword } from '../../../web'
import { makeResetUserPassword } from '../../factories'

export function ResetUserPasswordPage() {
  const navigate = useNavigate()
  const notify = useToast()
  const [searchParams] = useSearchParams()
  const authorizationToken = useMemo(
    () => searchParams.get('authorizationToken') || '',
    [searchParams]
  )

  const [newPassword, setNewPassword] = useState('')
  const [confirmedPassword, setConfirmedPassword] = useState('')
  const [isResetting, setIsResetting] = useState(false)

  const reset = async () => {
    try {
      setIsResetting(true)

      const service = makeResetUserPassword(authorizationToken)
      await service.reset({
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

  return (
    <ResetUserPassword
      authorizationToken={authorizationToken}
      newPassword={newPassword}
      onChangeNewPassword={setNewPassword}
      confirmedPassword={confirmedPassword}
      onChangeConfirmedPassword={setConfirmedPassword}
      onReset={reset}
      isResetting={isResetting}
    />
  )
}
