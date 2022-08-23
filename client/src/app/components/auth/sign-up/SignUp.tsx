import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
import { AuthenticationLayout } from '../AuthenticationLayout'
import { useSignUp } from '../../../hooks/useSignUp'

export function SignUp() {
  const { signedUser, isLoading } = useSignedUser()
  const { signUp, isSigning } = useSignUp()
  const navigate = useNavigate()
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmedPassword, setConfirmedPassword] = useState<string>('')

  useEffect(() => {
    if (signedUser) {
      navigate('/')
    }
  }, [signedUser])

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
    const params = { name, email, password, confirmedPassword }
    const signature = await signUp(params)
    if (signature) {
      setName('')
      setEmail('')
      setPassword('')
      setConfirmedPassword('')
      navigate('/')
    }
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
          <Stack
            direction={{ base: 'column', sm: 'row' }}
            align={'start'}
            justify={'space-between'}
          >
            <Checkbox isDisabled={isSigning || isLoading}>Lembrar</Checkbox>
            <Link color={'blue'}>Já possui uma conta? Entrar</Link>
          </Stack>
          <Button
            type="submit"
            bg={'blue'}
            color={'white'}
            isDisabled={isSigning || isLoading}
            isLoading={isSigning || isLoading}
          >
            Cadastrar
          </Button>
        </Stack>
      </Stack>
    </AuthenticationLayout>
  )
}
