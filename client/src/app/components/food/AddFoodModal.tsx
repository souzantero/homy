import { ChangeEvent, FormEvent, useState } from "react"
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { useAddFood } from "../../hooks/useAddFood"

export interface AddFoodModalProps {
  isOpen: Boolean
  onClose: () => void
}

export function AddFoodModal({
  isOpen,
  onClose
}: AddFoodModalProps) {
  const [name, setName] = useState<String>('')
  const [expiresIn, setExpiresIn] = useState<String>('')
  const { addFood, isAdding } = useAddFood()

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)
  const handleChangeExpiresIn = (event: ChangeEvent<HTMLInputElement>) => setExpiresIn(event.target.value)
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const expiresInInt = parseInt(expiresIn.valueOf())
    const params = { name, expiresIn: isNaN(expiresInInt) ? 0 : expiresInInt }
    await addFood(params)
    clear()
  }

  const clear = () => {
    setName('')
    setExpiresIn('')
  }

  return (
    <Modal isOpen={isOpen.valueOf()} onClose={onClose}>
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
            <Input type='number' value={expiresIn.valueOf()}  min={1} onChange={handleChangeExpiresIn}/>
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