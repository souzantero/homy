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
import { PropsWithChildren } from "react"

export interface CautionButtonProps {
  cautionMessage?: string,
  isLoading?: boolean,
  onConfirm: () => void
}

export function CautionButton({
  cautionMessage,
  isLoading,
  onConfirm,
  children
}: PropsWithChildren<CautionButtonProps>) {
  const { onOpen, onClose, isOpen } = useDisclosure()
  const handleClickYes = () => {
    onConfirm()
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
          isDisabled={isLoading}
          isLoading={isLoading}
        >
          {children}
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent paddingTop={4}>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            {cautionMessage ? cautionMessage : 'Você tem certeza que deseja fazer isso?'}
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