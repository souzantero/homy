import { FormEvent } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Link,
  Stack
} from '@chakra-ui/react'
import { isEmail } from '../../../../domain/utils'
import { CentralizedBox } from '../../../layout'
import { useForgetUserPassword } from '../../hooks'

export function ForgetUserPassword() {
  const { email, setEmail, isForgetting, forget } = useForgetUserPassword()

  const subtitle =
    'Informe seu e-mail e clique em "Esquecer" para receber as instruções necessárias para criar uma nova senha'

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    await forget()
  }

  return (
    <CentralizedBox title="Esqueci minha senha" subtitle={subtitle}>
      <Stack as={'form'} spacing={4} onSubmit={handleSubmit}>
        <FormControl id="email" isRequired isDisabled={isForgetting}>
          <FormLabel>E-mail</FormLabel>
          <Input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </FormControl>
        <Stack spacing={4}>
          <Button
            type="submit"
            bg={'blue'}
            color={'white'}
            isDisabled={isForgetting}
            isLoading={isForgetting}
          >
            Esquecer
          </Button>
          <Stack align={'center'}>
            <Link
              as={RouterLink}
              to={isEmail(email) ? `/users/confirm-email?email=${email}` : '#'}
              color={'blue'}
            >
              Ainda não confirmou seu e-mail? Confirmar
            </Link>
            <Link as={RouterLink} to={'/auth/sign-in'} color={'blue'}>
              Lembrou a sua senha? Entrar
            </Link>
          </Stack>
        </Stack>
      </Stack>
    </CentralizedBox>
  )
}
