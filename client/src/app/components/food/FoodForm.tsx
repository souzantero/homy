import { ChangeEvent, FormEvent, useState } from 'react'
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Spacer,
  Stack
} from '@chakra-ui/react'
import { ActionButton } from '../button/ActionButton'
import { parseIntOrZeroIfNaN } from '../../../domain/utils'

export enum Period {
  Day = 1,
  Month = 30,
  Year = 365
}

export interface FoodFormData {
  name: string
  expiresIn: number
  period: Period
}

export interface FoodFormProps {
  value: FoodFormData
  onChange: (data: FoodFormData) => void
  onSubmit: () => void
  isDisabled?: boolean
  isLoading?: boolean
  buttonText?: string
  buttonLoadingText?: string
}

export function FoodForm({
  isDisabled,
  isLoading,
  value,
  onChange,
  onSubmit,
  buttonText,
  buttonLoadingText
}: FoodFormProps) {
  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = { ...value }
    newValue.name = event.target.value
    onChange(newValue)
  }

  const handleChangeExpiresIn = (event: ChangeEvent<HTMLInputElement>) => {
    const expiresInInt = parseIntOrZeroIfNaN(event.target.value)
    const newValue = { ...value }
    newValue.expiresIn = expiresInInt
    onChange(newValue)
  }

  const handleChangePeriod = (event: ChangeEvent<HTMLSelectElement>) => {
    const period =
      Object.values(Period).find(
        (key) => key.toString() === event.target.value
      ) || '1'
    const periodValue = typeof period === 'string' ? parseInt(period) : period
    const newValue = { ...value }
    newValue.period = periodValue
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

      <Stack direction={'row'}>
        <FormControl isRequired isDisabled={isDisabled}>
          <FormLabel>Validade</FormLabel>
          <Input
            type="number"
            value={value.expiresIn || ''}
            min={1}
            onChange={handleChangeExpiresIn}
          />
        </FormControl>

        <FormControl isDisabled={isDisabled}>
          <FormLabel>Período</FormLabel>
          <Select value={value.period} onChange={handleChangePeriod}>
            <option value="1">Dia(s)</option>
            <option value="30">Mês(es)</option>
            <option value="365">Ano(s)</option>
          </Select>
        </FormControl>
      </Stack>

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
