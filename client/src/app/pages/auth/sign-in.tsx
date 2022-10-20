import { useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User } from '../../../domain'
import { SignIn, useSignIn } from '../../../web'
import { useSignedUser } from '../../hooks'
import { makeSignIn } from '../../factories'

export function SignInPage() {
  const notify = useToast()
  const navigate = useNavigate()
  const [signInWithUser, setSignInWithUser] = useState(makeSignIn(false))
  const { signedUser, isLoading } = useSignedUser()

  const {
    email,
    setEmail,
    password,
    setPassword,
    remindMe,
    setRemindMe,
    signIn,
    isSigning
  } = useSignIn({
    signInWithUser,
    onSigned: (signedUser: User) => {
      navigate('/')
    },
    onNotify: notify
  })

  useEffect(() => {
    setSignInWithUser(makeSignIn(remindMe))
  }, [remindMe])

  useEffect(() => {
    if (signedUser) {
      navigate('/')
    }
  }, [signedUser])

  return (
    <SignIn
      email={email}
      password={password}
      remindMe={remindMe}
      onChangeEmail={setEmail}
      onChangePassword={setPassword}
      onChangeRemindMe={setRemindMe}
      onSignIn={signIn}
      isSigning={isSigning}
      isLoading={isLoading}
      onSingUp={() => navigate('/auth/sign-up')}
      onForgetPassword={() => navigate('/users/forget-password')}
    />
  )
}
