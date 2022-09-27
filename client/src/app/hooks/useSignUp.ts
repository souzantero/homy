import { useEffect, useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { makeSignUp } from '../factories/sign-up-factory'
import { SignUp } from '../../domain/services/sign-up'
import { useSignedUser } from './useSignedUser'
import { useNavigate } from 'react-router-dom'

export type Result = {
  name: string
  setName: (value: string) => void
  email: string
  setEmail: (value: string) => void
  password: string
  setPassword: (value: string) => void
  confirmedPassword: string
  setConfirmedPassword: (value: string) => void
  signUp: () => Promise<SignUp.Result | undefined>
  isSigning: boolean
  isLoading: boolean
}

export function useSignUp(): Result {
  const notify = useToast()
  const navigate = useNavigate()

  const { signedUser, isLoading } = useSignedUser()
  const [isSigning, setIsSigning] = useState(false)

  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmedPassword, setConfirmedPassword] = useState<string>('')

  const signUp = async () => {
    try {
      setIsSigning(true)

      const signUp = makeSignUp()
      const signedUser = await signUp.signUp({
        name,
        email,
        password,
        confirmedPassword
      })

      setName('')
      setEmail('')
      setPassword('')
      setConfirmedPassword('')
      navigate('/')

      notify({
        status: 'success',
        title: 'Cadastrado.',
        description: 'Cadastro realizado com sucesso.'
      })

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

  useEffect(() => {
    if (signedUser) {
      navigate('/')
    }
  }, [signedUser])

  return {
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
  }
}
