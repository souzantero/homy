import { ChangeEvent, FormEvent, useState } from "react"
import { Box, Button, ButtonGroup, Container, Flex, FormControl, FormLabel, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Skeleton, Spacer, useBoolean } from '@chakra-ui/react'
import { useFoods } from "../hooks/useFoods"
import { useAddFood } from "../hooks/useAddFood"
import { FoodTable } from './FoodTable'

export function Foods() {
  const [isAdd, isAddAction] = useBoolean()
  const { foods, isLoading } = useFoods()
  const handleClickAdd = () => {
    isAdd ? isAddAction.off() : isAddAction.on()
  }

  if (isLoading) return <Skeleton height='20px' />
  return (
    <>
      <AddFoodModal isOpen={isAdd} onClose={isAddAction.off} />
      <Container padding='2'>
        <Flex padding='2' minWidth='max-content' alignItems='center' gap='2'>
          <Box padding='2'>
            <Heading size='md'>Alimentos</Heading>
          </Box>
          <Spacer />
          <ButtonGroup gap='2'>
            <Button onClick={handleClickAdd}>Adicionar</Button>
          </ButtonGroup>
        </Flex>
        <Box marginTop='2'>
          <FoodTable foods={foods || []} />
        </Box>
      </Container>
    </>
  )
}

interface AddFoodModalProps {
  isOpen: boolean
  onClose: () => void
}

function AddFoodModal({
  isOpen,
  onClose
}: AddFoodModalProps) {
  const [name, setName] = useState<String>('')
  const [expiresIn, setExpiresIn] = useState<Number>(0)
  const { addFood, isAdding } = useAddFood()

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)
  const handleChangeExpiresIn = (event: ChangeEvent<HTMLInputElement>) => setExpiresIn(parseInt(event.target.value))
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    try {
      const params = { name, expiresIn }
      await addFood(params)
      setName('')
      setExpiresIn(0)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent as={'form'} onSubmit={handleSubmit}>
        <ModalHeader>Adicionar alimento</ModalHeader>
        <ModalCloseButton />
          
        <ModalBody>
          <FormControl isRequired isDisabled={isAdding.valueOf()}>
            <FormLabel>Nome</FormLabel>
            <Input type='text' value={name.valueOf()} onChange={handleChangeName} />
          </FormControl>
          <FormControl isRequired isDisabled={isAdding.valueOf()}>
            <FormLabel>Validade</FormLabel>
            <Input type='number' value={expiresIn.valueOf()}  min={0} onChange={handleChangeExpiresIn}/>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button type='submit' variant='ghost' isLoading={isAdding.valueOf()}>Enviar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}