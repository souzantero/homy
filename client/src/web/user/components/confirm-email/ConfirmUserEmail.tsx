import { ChangeEvent, FormEvent, useMemo } from 'react'
import { Button, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react'
import { isEmail } from '../../../../domain/utils'
import { CentralizedBox } from '../../../layout'

export interface ConfirmUserEmailProps {
  email: string
  confirmationCode: string
  onChangeConfirmationCode: (value: string) => void
  onConfirm: (email: string) => Promise<boolean>
  onRefresh: (email: string) => Promise<void>
  isConfirming: boolean
  isRefreshing: boolean
}

export function ConfirmUserEmail({
  email,
  confirmationCode,
  onChangeConfirmationCode,
  onConfirm,
  onRefresh,
  isConfirming,
  isRefreshing
}: ConfirmUserEmailProps) {
  const isValid = isEmail(email)
  const subtitle = useMemo(() => {
    if (email && isValid) return email
    else if (email && !isValid) return 'E-mail inválido'
    else return 'E-mail não informado'
  }, [email, isValid])

  const handleChangeConfirmationCode = (event: ChangeEvent<HTMLInputElement>) =>
    onChangeConfirmationCode(event.target.value)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    await onConfirm(email)
  }

  const handleClickRequestNewConfirmationCode = async () => {
    await onRefresh(email)
  }

  return (
    <CentralizedBox title="Confirmar e-mail" subtitle={subtitle}>
      <Stack as={'form'} spacing={4} onSubmit={handleSubmit}>
        <FormControl
          id="confirmation-code"
          isRequired
          isDisabled={!isValid || isConfirming || isRefreshing}
        >
          <FormLabel>Código de confirmação</FormLabel>
          <Input
            type="text"
            autoComplete="confirmation-code"
            value={confirmationCode}
            onChange={handleChangeConfirmationCode}
          />
        </FormControl>
        <Stack spacing={4}>
          <Button
            type="submit"
            bg={'blue'}
            color={'white'}
            isDisabled={!isValid || isConfirming || isRefreshing}
            isLoading={isConfirming}
          >
            Confirmar
          </Button>

          <Button
            color={'blue'}
            borderColor={'blue'}
            variant={'outline'}
            isDisabled={!isValid || isConfirming || isRefreshing}
            isLoading={isRefreshing}
            onClick={handleClickRequestNewConfirmationCode}
          >
            Solicitar um código novo
          </Button>
        </Stack>
      </Stack>
    </CentralizedBox>
  )
}
