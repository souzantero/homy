import { ChangeEvent, FormEvent, useState } from "react"
import { Flex, FormControl, FormLabel, Input, Spacer, Stack } from '@chakra-ui/react'
import { useAddFood } from "../../hooks/useAddFood"
import { useNavigate } from "react-router-dom"
import { Page } from "../layout/Page"
import { PageHeader } from "../layout/PageHeader"
import { PageBody } from "../layout/PageBody"
import { ActionButton } from "../button/ActionButton"

export function AddFood() {
  const navigate = useNavigate()
  const [name, setName] = useState<string>('')
  const [expiresIn, setExpiresIn] = useState<string>('')
  const { addFood, isAdding } = useAddFood()

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)
  const handleChangeExpiresIn = (event: ChangeEvent<HTMLInputElement>) => setExpiresIn(event.target.value)
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const expiresInInt = parseInt(expiresIn.valueOf())
    const params = { name, expiresIn: isNaN(expiresInInt) ? 0 : expiresInInt }
    const createdFood = await addFood(params)
    if (createdFood) {
      clear()
      navigate('/foods')
    }    
  }

  const clear = () => {
    setName('')
    setExpiresIn('')
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
          <FormControl isRequired isDisabled={isAdding}>
            <FormLabel>Validade</FormLabel>
            <Input type='number' value={expiresIn}  min={1} onChange={handleChangeExpiresIn}/>
          </FormControl>
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