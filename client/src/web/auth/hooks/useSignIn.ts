import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'
import { SignIn } from '../../../domain'
import { makeSignIn } from '../factories'
import { useSignedUser } from './useSignedUser'

export function useSignIn(): {
  email: string
  setEmail: (value: string) => void
  password: string
  setPassword: (value: string) => void
  remindMe: boolean
  setRemindMe: (value: boolean) => void
  isSigning: boolean
  signIn: () => Promise<SignIn.Result | undefined>
  isLoading: boolean
} {
  const navigate = useNavigate()
  const notify = useToast()

  const { signedUser, isLoading } = useSignedUser()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [remindMe, setRemindMe] = useState<boolean>(false)
  const [isSigning, setIsSigning] = useState(false)

  const signIn = async () => {
    try {
      setIsSigning(true)

      const signIn = makeSignIn(remindMe)
      const signedUser = await signIn.signIn({
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

  useEffect(() => {
    if (signedUser) {
      navigate('/')
    }
  }, [signedUser])

  return {
    email,
    setEmail,
    password,
    setPassword,
    remindMe,
    setRemindMe,
    signIn,
    isSigning,
    isLoading
  }
}
