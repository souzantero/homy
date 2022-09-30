import { Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { SignInLink } from './SignInLink'

export function UnsignedUser() {
  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'}>
      <Stack align={'center'}>
        <Heading fontSize={'2xl'}>Usuário não conectado</Heading>
        <Text fontSize={'lg'} color={'gray.600'}>
          <SignInLink>conecte-se</SignInLink> com o seu usuário e senha para ter
          acesso a este recurso
        </Text>
      </Stack>
    </Flex>
  )
}
