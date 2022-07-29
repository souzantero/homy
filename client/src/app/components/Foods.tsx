import { ChangeEvent, FormEvent, useMemo, useState } from "react"
import { Box, Button, ButtonGroup, Container, Flex, FormControl, FormLabel, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Skeleton, Spacer, useBoolean } from '@chakra-ui/react'
import { useFoods } from "../hooks/useFoods"
import { FoodTable } from './FoodTable'

export function Foods() {
  const [isAdd, isAddAction] = useBoolean()
  
  const { foods, addFood } = useFoods()
  const fetching = useMemo(() => !foods, [foods])

  const handleClickAdd = () => {
    isAdd ? isAddAction.off() : isAddAction.on()
  }

  if (fetching) return <Skeleton height='20px' />
  return (
    <>
      <AddFoodModal isOpen={isAdd} onClose={isAddAction.off} onAdd={addFood} />
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
  isOpen: boolean,
  onClose: () => void,
  onAdd: (params: { name: String, expiresIn: Number }) => void
}

function AddFoodModal({
  isOpen,
  onClose,
  onAdd
}: AddFoodModalProps) {
  const [name, setName] = useState<String>('')
  const [expiresIn, setExpiresIn] = useState<Number>(0)

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)
  const handleChangeExpiresIn = (event: ChangeEvent<HTMLInputElement>) => setExpiresIn(parseInt(event.target.value))
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const params = { name, expiresIn}
    onAdd(params)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent as={'form'} onSubmit={handleSubmit}>
        <ModalHeader>Adicionar alimento</ModalHeader>
        <ModalCloseButton />
          
        <ModalBody>
          <FormControl>
            <FormLabel>Nome</FormLabel>
            <Input type='text' required onChange={handleChangeName} />
          </FormControl>
          <FormControl>
            <FormLabel>Validade</FormLabel>
            <Input type='number' min={0} required onChange={handleChangeExpiresIn}/>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button type='submit' variant='ghost'>Enviar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}