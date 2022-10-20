import { useEffect, useState } from 'react'
import { SignUp, User } from '../../domain'
import { Notify } from '../../presentation'

export interface UseSignUpOptions {
  signUpUser: SignUp
  onSigned: (signedUser: User) => void
  onNotify: Notify
}

export function useSignUp({
  signUpUser,
  onSigned,
  onNotify
}: UseSignUpOptions): {
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
} {
  const [isSigning, setIsSigning] = useState(false)

  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmedPassword, setConfirmedPassword] = useState<string>('')

  const signUp = async () => {
    try {
      setIsSigning(true)
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

      onNotify({
        status: 'success',
        title: 'Cadastrado.',
        description: 'Cadastro realizado com sucesso.'
      })

      onSigned(signedUser)

      return signedUser
    } catch (error) {
      const status = 'error'
      const title = 'Falha ao cadastrar-se.'
      const description =
        error instanceof Error
          ? error.message
          : 'Não foi possível cadastrar a sua conta no momento, tente novamente mais tarde.'
      onNotify({ status, title, description })
    } finally {
      setIsSigning(false)
    }
  }

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
    isSigning
  }
}
