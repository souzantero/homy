import { Flex, Heading, Link, Stack, Text } from "@chakra-ui/react"
import { Link as RouterLink } from 'react-router-dom'

export function UnsignedUser() {
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}>
      <Stack align={'center'}>
        <Heading fontSize={'2xl'}>Usuário não conectado</Heading>
        <Text fontSize={'lg'} color={'gray.600'}>
          <Link as={RouterLink} to={'/auth/sign-in'} color={'blue'}>conecte-se</Link> com o seu usuário e senha para ter acesso a este recurso
        </Text>
      </Stack>
    </Flex>
  )
}