import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import {
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button
} from '@chakra-ui/react'
import { useSignedUser } from '../../../hooks/useSignedUser'
import { useSignIn } from '../../../hooks/useSignIn'
import { AuthenticationLayout } from '../AuthenticationLayout'

export function SignIn() {
  const { signedUser, isLoading } = useSignedUser()
  const { signIn, isSigning } = useSignIn()
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  useEffect(() => {
    if (signedUser) {
      navigate('/')
    }
  }, [signedUser])

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value)
  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value)
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const params = { email, password }
    const signature = await signIn(params)
    if (signature) {
      setEmail('')
      setPassword('')
      navigate('/')
    }
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
            <Checkbox isDisabled={isSigning || isLoading}>Lembrar</Checkbox>
            <Link color={'blue'}>Esqueceu a senha?</Link>
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
