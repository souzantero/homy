import { FormEvent, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Button, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react'
import { CentralizedBox } from '../../../layout'
import { useResetUserPassword } from '../../hooks'

export function ResetUserPassword() {
  const [searchParams] = useSearchParams()
  const authorizationToken = useMemo(
    () => searchParams.get('authorizationToken') || '',
    [searchParams]
  )

  const isDisabled = useMemo(() => !authorizationToken, [authorizationToken])

  const {
    newPassword,
    setNewPassword,
    confirmedPassword,
    setConfirmedPassword,
    reset,
    isResetting
  } = useResetUserPassword()

  const subtitle = 'Escolha uma nova senha de acesso'

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    await reset(authorizationToken)
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
            onChange={(event) => setNewPassword(event.target.value)}
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
            onChange={(event) => setConfirmedPassword(event.target.value)}
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
