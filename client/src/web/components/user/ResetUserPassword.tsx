import { FormEvent, useMemo } from 'react'
import { Button, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react'
import { CentralizedBox } from '../layout'

export interface ResetUserPasswordProps {
  authorizationToken: string
  newPassword: string
  onChangeNewPassword: (value: string) => void
  confirmedPassword: string
  onChangeConfirmedPassword: (value: string) => void
  onReset: () => Promise<void>
  isResetting: boolean
}

export function ResetUserPassword({
  authorizationToken,
  newPassword,
  onChangeNewPassword,
  confirmedPassword,
  onChangeConfirmedPassword,
  onReset,
  isResetting
}: ResetUserPasswordProps) {
  const isDisabled = useMemo(() => !authorizationToken, [authorizationToken])

  const subtitle = 'Escolha uma nova senha de acesso'

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    await onReset()
  }

  return (
    <CentralizedBox title="Redefinir senha" subtitle={subtitle}>
      <Stack as={'form'} spacing={4} onSubmit={handleSubmit}>
        <FormControl
          id="new-password"
          isRequired
          isDisabled={isDisabled || isResetting}
        >
          <FormLabel>Nova senha</FormLabel>
          <Input
            type="password"
            autoComplete="new-password"
            minLength={8}
            value={newPassword}
            onChange={(event) => onChangeNewPassword(event.target.value)}
          />
        </FormControl>

        <FormControl
          id="confirmed-password"
          isRequired
          isDisabled={isDisabled || isResetting}
        >
          <FormLabel>Confirmar senha</FormLabel>
          <Input
            type="password"
            autoComplete="confirmed-password"
            minLength={8}
            value={confirmedPassword}
            onChange={(event) => onChangeConfirmedPassword(event.target.value)}
          />
        </FormControl>
        <Stack spacing={4}>
          <Button
            type="submit"
            bg={'blue'}
            color={'white'}
            isDisabled={isDisabled || isResetting}
            isLoading={isResetting}
          >
            Redefinir
          </Button>
        </Stack>
      </Stack>
    </CentralizedBox>
  )
}
