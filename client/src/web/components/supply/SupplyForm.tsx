import { ChangeEvent, FormEvent } from 'react'
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Spacer,
  Stack
} from '@chakra-ui/react'
import { ActionButton } from '../layout'

interface Data {
  name: string
}

interface Props {
  value: Data
  onChange: (data: Data) => void
  onSubmit: () => void
  isDisabled?: boolean
  isLoading?: boolean
  buttonText?: string
  buttonLoadingText?: string
}

export function SupplyForm({
  isDisabled,
  isLoading,
  value,
  onChange,
  onSubmit,
  buttonText,
  buttonLoadingText
}: Props) {
  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = { ...value }
    newValue.name = event.target.value
    onChange(newValue)
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    onSubmit()
  }

  return (
    <Stack as={'form'} spacing={4} onSubmit={handleSubmit}>
      <FormControl isRequired isDisabled={isDisabled}>
        <FormLabel>Nome</FormLabel>
        <Input type="text" value={value.name} onChange={handleChangeName} />
      </FormControl>
      <Flex minWidth={'max-content'} alignItems={'end'} gap={2}>
        <Spacer />
        <ActionButton
          type="submit"
          isDisabled={isDisabled}
          isLoading={isLoading}
          loadingText={buttonLoadingText || 'Enviando...'}
        >
          {buttonText || 'Enviar'}
        </ActionButton>
      </Flex>
    </Stack>
  )
}
