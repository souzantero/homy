import { useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SignIn } from '../../../web'
import { useSignedUser } from '../../hooks'
import { makeSignIn } from '../../factories'

export function SignInPage() {
  const notify = useToast()
  const navigate = useNavigate()
  const [signInWithUser, setSignInWithUser] = useState(makeSignIn(false))
  const { signedUser, isLoading } = useSignedUser()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [remindMe, setRemindMe] = useState<boolean>(false)
  const [isSigning, setIsSigning] = useState(false)

  useEffect(() => {
    setSignInWithUser(makeSignIn(remindMe))
  }, [remindMe])

  useEffect(() => {
    if (signedUser) {
      navigate('/')
    }
  }, [signedUser])

  const signIn = async () => {
    try {
      setIsSigning(true)

      const signedUser = await signInWithUser.signIn({
        email,
        password
      })

      setEmail('')
      setPassword('')

      notify({
        status: 'success',
        title: 'Conectado.',
        description: 'Conexão realizada com sucesso.'
      })

      navigate('/')

      return signedUser
    } catch (error) {
      const status = 'error'
      const title = 'Falha ao conectar-se a sua conta.'
      const description =
        error instanceof Error
          ? error.message
          : 'Não foi possível conectar-se a sua conta no momento, tente novamente mais tarde.'
      notify({ status, title, description })
    } finally {
      setIsSigning(false)
    }
  }

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
