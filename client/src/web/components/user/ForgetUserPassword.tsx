import { FormEvent } from 'react'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Link,
  Stack
} from '@chakra-ui/react'
import { isEmail } from '../../../domain/utils'
import { CentralizedBox } from '../layout'

export interface ForgetUserPasswordProps {
  email: string
  onChangeEmail: (value: string) => void
  isForgetting: boolean
  onForget: () => Promise<void>
  onConfirmEmail: () => void
  onSignIn: () => void
}

export function ForgetUserPassword({
  email,
  onChangeEmail,
  isForgetting,
  onForget,
  onConfirmEmail,
  onSignIn
}: ForgetUserPasswordProps) {
  const subtitle =
    'Informe seu e-mail e clique em "Esquecer" para receber as instruções necessárias para criar uma nova senha'

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    await onForget()
  }

  const handleConfirmEmail = () => {
    if (isEmail(email)) {
      onConfirmEmail()
    }
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
            onChange={(event) => onChangeEmail(event.target.value)}
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
            <Link color={'blue'} onClick={handleConfirmEmail}>
              Ainda não confirmou seu e-mail? Confirmar
            </Link>
            <Link color={'blue'} onClick={onSignIn}>
              Lembrou a sua senha? Entrar
            </Link>
          </Stack>
        </Stack>
      </Stack>
    </CentralizedBox>
  )
}
