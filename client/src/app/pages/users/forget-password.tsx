import { useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { ForgetUserPassword, useForgetUserPassword } from '../../../web'
import { makeForgetUserPassword } from '../../factories'

export function ForgetUserPasswordPage() {
  const navigate = useNavigate()
  const notify = useToast()

  const forgetUserPassword = makeForgetUserPassword()
  const { email, setEmail, isForgetting, forget } = useForgetUserPassword({
    forgetUserPassword,
    onNotify: notify
  })

  return (
    <ForgetUserPassword
      email={email}
      onChangeEmail={setEmail}
      isForgetting={isForgetting}
      onForget={forget}
      onConfirmEmail={() => navigate(`/users/confirm-email?email=${email}`)}
      onSignIn={() => navigate('/auth/sign-in')}
    />
  )
}
