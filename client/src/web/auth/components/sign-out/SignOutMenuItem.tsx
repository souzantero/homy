import { useRef } from 'react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  MenuItem,
  useDisclosure
} from '@chakra-ui/react'
import { useSignOut } from '../../hooks'

export function SignOutMenuItem() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef(null)
  const { signOut, isSigningOut } = useSignOut()

  const handleSignOut = async () => {
    await signOut()
    onClose()
  }

  return (
    <>
      <MenuItem onClick={onOpen}>Sair</MenuItem>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent className="sign-out-alert-dialog">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Sair da conta
            </AlertDialogHeader>

            <AlertDialogBody>
              Você tem certeza que deseja sair da sua conta?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={onClose}
                isLoading={isSigningOut}
                isDisabled={isSigningOut}
              >
                Cancelar
              </Button>
              <Button
                className="confirm-user-sign-out-button"
                colorScheme="red"
                onClick={handleSignOut}
                ml={3}
                isLoading={isSigningOut}
                isDisabled={isSigningOut}
              >
                Sair
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
