import { ChangeEvent, FormEvent, useState } from "react"
import { Button, Flex, FormControl, FormLabel, Heading, Input, Spacer, Stack } from '@chakra-ui/react'
import { useAddFood } from "../../hooks/useAddFood"
import { useNavigate } from "react-router-dom"
import { Page } from "../layout/Page"
import { PageHeader } from "../layout/PageHeader"
import { PageBody } from "../layout/PageBody"

export function AddFood() {
  const navigate = useNavigate()
  const [name, setName] = useState<String>('')
  const [expiresIn, setExpiresIn] = useState<String>('')
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
          <FormControl isRequired isDisabled={isAdding.valueOf()}>
            <FormLabel>Nome</FormLabel>
            <Input type='text' value={name.valueOf()} onChange={handleChangeName} />
          </FormControl>
          <FormControl isRequired isDisabled={isAdding.valueOf()}>
            <FormLabel>Validade</FormLabel>
            <Input type='number' value={expiresIn.valueOf()}  min={1} onChange={handleChangeExpiresIn}/>
          </FormControl>
          <Flex minWidth={'max-content'} alignItems={'end'} gap={2}>
            <Spacer/>
            <Button
              color={'green'}
              borderColor={'green'}
              variant={'outline'}
              type='submit'
              size={'sm'}
              isDisabled={isAdding.valueOf()}
              isLoading={isAdding.valueOf()}
            >
              Enviar
            </Button>
          </Flex>
        </Stack>
      </PageBody>
    </Page>
  )
}