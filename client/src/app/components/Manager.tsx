import { Outlet } from 'react-router-dom'
import {
  Box,
  Drawer,
  DrawerContent,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

export function Manager() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <Sidebar onClose={onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <Sidebar onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <Header onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4" as="main">
        <Outlet />
      </Box>
    </Box>
  )
}
