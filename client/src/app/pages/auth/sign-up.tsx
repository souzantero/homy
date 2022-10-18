import { useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { SignUp, useSignUp } from '../../../web'
import { makeSignUp } from '../../factories'

export function SignUpPage() {
  const navigate = useNavigate()
  const notify = useToast()

  const signUpUser = makeSignUp()
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmedPassword,
    setConfirmedPassword,
    signUp,
    isSigning,
    isLoading
  } = useSignUp({
    signUpUser,
    onNotify: notify,
    onSigned(signedUser) {
      navigate('/')
    }
  })

  return (
    <SignUp
      name={name}
      onChangeName={setName}
      email={email}
      onChangeEmail={setEmail}
      password={password}
      onChangePassword={setPassword}
      confirmedPassword={confirmedPassword}
      onChangeConfirmedPassword={setConfirmedPassword}
      onSignUp={signUp}
      onSignIn={() => navigate('/auth/sign-in')}
      isSigning={isSigning}
      isLoading={isLoading}
    />
  )
}
