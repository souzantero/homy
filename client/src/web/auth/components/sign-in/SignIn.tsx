import { ChangeEvent, FormEvent } from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button
} from '@chakra-ui/react'
import { AuthenticationLayout } from '../AuthenticationLayout'
import { User } from '../../../../domain'

export interface SignInProps {
  email: string
  onChangeEmail: (value: string) => void
  password: string
  onChangePassword: (value: string) => void
  remindMe: boolean
  onChangeRemindMe: (value: boolean) => void
  onSignIn: () => Promise<User | undefined>
  isSigning: boolean
  isLoading: boolean
  onSingUp: () => void
  onForgetPassword: () => void
}

export function SignIn({
  email,
  onChangeEmail,
  password,
  onChangePassword,
  remindMe,
  onChangeRemindMe,
  onSignIn,
  isSigning,
  isLoading,
  onSingUp,
  onForgetPassword
}: SignInProps) {
  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) =>
    onChangeEmail(event.target.value)
  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) =>
    onChangePassword(event.target.value)
  const handleChangeRemindMe = (event: ChangeEvent<HTMLInputElement>) =>
    onChangeRemindMe(event.target.checked)
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    await onSignIn()
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
            <Link color={'blue'} onClick={onForgetPassword}>
              Esqueceu a senha?
            </Link>
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
            <Link color={'blue'} onClick={onSingUp}>
              Cadastre-se
            </Link>
          </Stack>
        </Stack>
      </Stack>
    </AuthenticationLayout>
  )
}
