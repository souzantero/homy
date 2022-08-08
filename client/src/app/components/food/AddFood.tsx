import { ChangeEvent, FormEvent, useState } from "react"
import { Flex, FormControl, FormLabel, Input, Select, Spacer, Stack } from '@chakra-ui/react'
import { useAddFood } from "../../hooks/useAddFood"
import { useNavigate } from "react-router-dom"
import { Page } from "../layout/Page"
import { PageHeader } from "../layout/PageHeader"
import { PageBody } from "../layout/PageBody"
import { ActionButton } from "../button/ActionButton"
import { parseIntOrZeroIfNaN } from "../../../domain/utils"

enum Period {
  Day = 1,
  Month = 30,
  Year = 365
}

export function AddFood() {
  const navigate = useNavigate()
  const [name, setName] = useState<string>('')
  const [expiresIn, setExpiresIn] = useState<string>('')
  const [period, setPeriod] = useState<Period>(Period.Day)
  
  const { addFood, isAdding } = useAddFood()

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)
  const handleChangeExpiresIn = (event: ChangeEvent<HTMLInputElement>) => setExpiresIn(event.target.value)
  const handleChangePeriod = (event: ChangeEvent<HTMLSelectElement>) => {
    const period = Object.values(Period).find(key => key.toString() === event.target.value) || '1'
    const periodValue = typeof period === 'string' ? parseInt(period) : period
    setPeriod(periodValue)
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const expiresInInt = parseIntOrZeroIfNaN(expiresIn)
    const params = { name, expiresIn: expiresInInt * period }
    const createdFood = await addFood(params)
    if (createdFood) {
      clear()
      navigate('/foods')
    }    
  }

  const clear = () => {
    setName('')
    setExpiresIn('')
    setPeriod(Period.Day)
  }

  return (
    <Page>
      <PageHeader title="Adicionar alimento"/>
      <PageBody>
        <Stack as={'form'} spacing={4} onSubmit={handleSubmit}>
          <FormControl isRequired isDisabled={isAdding}>
            <FormLabel>Nome</FormLabel>
            <Input type='text' value={name} onChange={handleChangeName} />
          </FormControl>

          <Stack direction={'row'}>
            <FormControl isRequired isDisabled={isAdding}>
              <FormLabel>Validade</FormLabel>
              <Input type='number' value={expiresIn}  min={1} onChange={handleChangeExpiresIn}/>
            </FormControl>

            <FormControl isDisabled={isAdding}>
              <FormLabel>Período</FormLabel>
              <Select value={period} onChange={handleChangePeriod}>
                <option value='1'>Dia(s)</option>
                <option value='30'>Mês(es)</option>
                <option value='365'>Ano(s)</option>
              </Select>
            </FormControl>
          </Stack>
          
          <Flex minWidth={'max-content'} alignItems={'end'} gap={2}>
            <Spacer/>
            <ActionButton
              type='submit'
              isDisabled={isAdding}
              isLoading={isAdding}
              loadingText='Enviando...'
            >
              Enviar
            </ActionButton>
          </Flex>
        </Stack>
      </PageBody>
    </Page>
  )
}