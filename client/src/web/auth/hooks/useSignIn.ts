import { useEffect, useState } from 'react'
import { SignIn, User } from '../../../domain'
import { useSignedUser } from './useSignedUser'
import { Notify } from '../../../presentation'

export interface UseSignInOptions {
  signInWithUser: SignIn
  onSigned: (signedUser: User) => void
  onNotify: Notify
}

export function useSignIn({
  signInWithUser,
  onSigned,
  onNotify
}: UseSignInOptions): {
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
  const { signedUser, isLoading } = useSignedUser()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [remindMe, setRemindMe] = useState<boolean>(false)
  const [isSigning, setIsSigning] = useState(false)

  const signIn = async () => {
    try {
      setIsSigning(true)

      const signedUser = await signInWithUser.signIn({
        email,
        password
      })

      setEmail('')
      setPassword('')

      onNotify({
        status: 'success',
        title: 'Conectado.',
        description: 'Conexão realizada com sucesso.'
      })

      onSigned(signedUser)

      return signedUser
    } catch (error) {
      const status = 'error'
      const title = 'Falha ao conectar-se a sua conta.'
      const description =
        error instanceof Error
          ? error.message
          : 'Não foi possível conectar-se a sua conta no momento, tente novamente mais tarde.'
      onNotify({ status, title, description })
    } finally {
      setIsSigning(false)
    }
  }

  useEffect(() => {
    if (signedUser) {
      onSigned(signedUser)
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
