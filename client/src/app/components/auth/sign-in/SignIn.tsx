import { ChangeEvent, FormEvent } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button
} from '@chakra-ui/react'
import { useSignIn } from '../../../hooks/useSignIn'
import { AuthenticationLayout } from '../AuthenticationLayout'

export function SignIn() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    remindMe,
    setRemindMe,
    signIn,
    isSigning,
    isLoading
  } = useSignIn()

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value)
  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value)
  const handleChangeRemindMe = (event: ChangeEvent<HTMLInputElement>) =>
    setRemindMe(event.target.checked)
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    await signIn()
  }

  return (
    <AuthenticationLayout title="Conecte-se">
      <Stack as={'form'} spacing={4} onSubmit={handleSubmit}>
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
        <Stack spacing={10}>
          <Stack
            direction={{ base: 'column', sm: 'row' }}
            align={'start'}
            justify={'space-between'}
          >
            <Checkbox
              isChecked={remindMe}
              onChange={handleChangeRemindMe}
              isDisabled={isSigning || isLoading}
            >
              Lembrar
            </Checkbox>
            <Link as={RouterLink} to={'/users/forget-password'} color={'blue'}>Esqueceu a senha?</Link>
          </Stack>
          <Button
            type="submit"
            bg={'blue'}
            color={'white'}
            isDisabled={isSigning || isLoading}
            isLoading={isSigning || isLoading}
          >
            Entrar
          </Button>
          <Stack align={'center'}>
            <Link as={RouterLink} to={'/auth/sign-up'} color={'blue'}>
              Cadastre-se
            </Link>
          </Stack>
        </Stack>
      </Stack>
    </AuthenticationLayout>
  )
}
