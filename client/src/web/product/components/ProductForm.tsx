import { ChangeEvent, FormEvent } from 'react'
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Spacer,
  Stack
} from '@chakra-ui/react'
import { ActionButton } from '../../layout'

export interface ProductFormData {
  name: string
}

export interface ProductFormProps {
  value: ProductFormData
  onChange: (data: ProductFormData) => void
  onSubmit: () => void
  isDisabled?: boolean
  isLoading?: boolean
  buttonText?: string
  buttonLoadingText?: string
}

export function ProductForm({
  isDisabled,
  isLoading,
  value,
  onChange,
  onSubmit,
  buttonText,
  buttonLoadingText
}: ProductFormProps) {
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
