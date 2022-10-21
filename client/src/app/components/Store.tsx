import { Outlet } from 'react-router-dom'
import { Box, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import { Header } from './Header'

export function Store() {
  const { onOpen } = useDisclosure()
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <Header onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4" as="main">
        <Outlet />
      </Box>
    </Box>
  )
}
