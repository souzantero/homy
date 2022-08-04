import { 
  Button, 
  ButtonGroup, 
  Popover, 
  PopoverArrow, 
  PopoverBody, 
  PopoverCloseButton, 
  PopoverContent, 
  PopoverFooter, 
  PopoverTrigger, 
  Portal, 
  useDisclosure 
} from "@chakra-ui/react"

export interface RemoveFoodButtonProps {
  isRemoving: boolean,
  onRemove: () => void
}

export function RemoveFoodButton({
  isRemoving,
  onRemove
}: RemoveFoodButtonProps) {
  const { onOpen, onClose, isOpen } = useDisclosure()
  const handleClickYes = () => {
    onRemove()
    onClose()
  }
  
  return (
    <Popover
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
    >
      <PopoverTrigger>
        <Button
          color={'red'}
          borderColor={'red'}
          size={'sm'}
          variant={'outline'}
          isDisabled={isRemoving.valueOf()}
          isLoading={isRemoving.valueOf()}
        >
          Remover
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent paddingTop={4}>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            Você tem certeza que deseja remover este alimento?
          </PopoverBody>
          <PopoverFooter>
            <ButtonGroup display='flex' justifyContent='flex-end'>
              <Button variant='outline' size='sm' onClick={onClose}>
                Não
              </Button>
              <Button colorScheme='red' size='sm' onClick={handleClickYes}>
                Sim
              </Button>
            </ButtonGroup>  
          </PopoverFooter>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}