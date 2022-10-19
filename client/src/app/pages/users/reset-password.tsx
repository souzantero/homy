import { useToast } from '@chakra-ui/react'
import { useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ResetUserPassword, useResetUserPassword } from '../../../web'
import { makeResetUserPassword } from '../../factories'

export function ResetUserPasswordPage() {
  const navigate = useNavigate()
  const notify = useToast()
  const [searchParams] = useSearchParams()
  const authorizationToken = useMemo(
    () => searchParams.get('authorizationToken') || '',
    [searchParams]
  )

  const {
    newPassword,
    setNewPassword,
    confirmedPassword,
    setConfirmedPassword,
    reset,
    isResetting
  } = useResetUserPassword({
    resetUserPasswordFactory() {
      return makeResetUserPassword(authorizationToken)
    },
    onNotify: notify,
    onReseted() {
      navigate('/auth/sign-in')
    }
  })

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
