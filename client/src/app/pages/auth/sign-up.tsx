import { useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SignUp } from '../../../web'
import { useSignedUser } from '../../hooks'
import { makeSignUp } from '../../factories'

export function SignUpPage() {
  const navigate = useNavigate()
  const notify = useToast()
  const { signedUser, isLoading } = useSignedUser()
  const [isSigning, setIsSigning] = useState(false)
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmedPassword, setConfirmedPassword] = useState<string>('')

  useEffect(() => {
    if (signedUser) {
      navigate('/')
    }
  }, [signedUser])

  const signUp = async () => {
    try {
      setIsSigning(true)

      const signUpUser = makeSignUp()
      const signedUser = await signUpUser.signUp({
        name,
        email,
        password,
        confirmedPassword
      })

      setName('')
      setEmail('')
      setPassword('')
      setConfirmedPassword('')

      notify({
        status: 'success',
        title: 'Cadastrado.',
        description: 'Cadastro realizado com sucesso.'
      })

      navigate('/')

      return signedUser
    } catch (error) {
      const status = 'error'
      const title = 'Falha ao cadastrar-se.'
      const description =
        error instanceof Error
          ? error.message
          : 'Não foi possível cadastrar a sua conta no momento, tente novamente mais tarde.'
      notify({ status, title, description })
    } finally {
      setIsSigning(false)
    }
  }

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
