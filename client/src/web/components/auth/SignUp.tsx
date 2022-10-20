import { ChangeEvent, FormEvent } from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button
} from '@chakra-ui/react'
import { AuthenticationLayout } from './AuthenticationLayout'
import { User } from '../../../domain'

export interface SingUpProps {
  name: string
  onChangeName: (value: string) => void
  email: string
  onChangeEmail: (value: string) => void
  password: string
  onChangePassword: (value: string) => void
  confirmedPassword: string
  onChangeConfirmedPassword: (value: string) => void
  onSignUp: () => Promise<User | undefined>
  onSignIn: () => void
  isSigning: boolean
  isLoading: boolean
}

export function SignUp({
  name,
  onChangeName,
  email,
  onChangeEmail,
  password,
  onChangePassword,
  confirmedPassword,
  onChangeConfirmedPassword,
  onSignUp,
  onSignIn,
  isSigning,
  isLoading
}: SingUpProps) {
  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) =>
    onChangeName(event.target.value)

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) =>
    onChangeEmail(event.target.value)

  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) =>
    onChangePassword(event.target.value)

  const handleChangeConfirmedPassword = (
    event: ChangeEvent<HTMLInputElement>
  ) => onChangeConfirmedPassword(event.target.value)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    await onSignUp()
  }

  return (
    <AuthenticationLayout title="Cadastre-se">
      <Stack as={'form'} spacing={4} onSubmit={handleSubmit}>
        <FormControl id="name" isRequired isDisabled={isSigning || isLoading}>
          <FormLabel>Nome</FormLabel>
          <Input
            type="text"
            autoComplete="name"
            value={name}
            onChange={handleChangeName}
          />
        </FormControl>
        <FormControl id="email" isRequired isDisabled={isSigning || isLoading}>
          <FormLabel>E-mail</FormLabel>
          <Input
            type="email"
            autoComplete="email"
            value={email}
            onChange={handleChangeEmail}
          />
        </FormControl>
        <FormControl
          id="password"
          isRequired
          isDisabled={isSigning || isLoading}
        >
          <FormLabel>Senha</FormLabel>
          <Input
            type="password"
            autoComplete="password"
            minLength={8}
            value={password}
            onChange={handleChangePassword}
          />
        </FormControl>

        <FormControl
          id="confirmed-password"
          isRequired
          isDisabled={isSigning || isLoading}
        >
          <FormLabel>Confirmar senha</FormLabel>
          <Input
            type="password"
            autoComplete="confirmed-password"
            minLength={8}
            value={confirmedPassword}
            onChange={handleChangeConfirmedPassword}
          />
        </FormControl>
        <Stack spacing={10}>
          <Stack />
          <Button
            type="submit"
            bg={'blue'}
            color={'white'}
            isDisabled={isSigning || isLoading}
            isLoading={isSigning || isLoading}
          >
            Cadastrar
          </Button>
          <Stack align={'center'}>
            <Link color={'blue'} onClick={onSignIn}>
              Já possui uma conta? Entrar
            </Link>
          </Stack>
        </Stack>
      </Stack>
    </AuthenticationLayout>
  )
}
