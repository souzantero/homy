import { Button, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react'
import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { isEmail } from '../../../../domain/utils'
import { CentralizedBox } from '../../layout/CentralizedBox'

export function ConfirmUserEmail() {
  const [searchParams] = useSearchParams()
  const userEmail = useMemo(
    () => searchParams.get('email') || '',
    [searchParams]
  )

  const isValid = isEmail(userEmail)
  const subtitle = useMemo(() => {
    if (userEmail && isValid) return userEmail
    else if (userEmail && !isValid) return 'E-mail inválido'
    else return 'E-mail não informado'
  }, [userEmail, isValid])

  return (
    <CentralizedBox title="Confirmar e-mail" subtitle={subtitle}>
      <Stack as={'form'} spacing={4}>
        <FormControl id="email" isRequired isDisabled={!isValid}>
          <FormLabel>Código de confirmação</FormLabel>
          <Input type="text" autoComplete="confirmation-code" />
        </FormControl>
        <Stack spacing={10}>
          <Button
            type="submit"
            bg={'blue'}
            color={'white'}
            isDisabled={!isValid}
          >
            Confirmar
          </Button>
        </Stack>
      </Stack>
    </CentralizedBox>
  )
}
