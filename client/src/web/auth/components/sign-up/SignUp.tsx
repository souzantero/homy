import { ChangeEvent, FormEvent } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button
} from '@chakra-ui/react'
import { AuthenticationLayout } from '../AuthenticationLayout'
import { useSignUp } from '../../hooks'

export function SignUp() {
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
  } = useSignUp()

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value)

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value)

  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value)

  const handleChangeConfirmedPassword = (
    event: ChangeEvent<HTMLInputElement>
  ) => setConfirmedPassword(event.target.value)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    await signUp()
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
            <Link as={RouterLink} to="/auth/sign-in" color={'blue'}>
              Já possui uma conta? Entrar
            </Link>
          </Stack>
        </Stack>
      </Stack>
    </AuthenticationLayout>
  )
}
