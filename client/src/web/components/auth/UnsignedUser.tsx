import { Flex, Heading, Link, Stack, Text } from '@chakra-ui/react'

export interface UnsignedUserProps {
  onSignIn: () => void
}

export function UnsignedUser({ onSignIn }: UnsignedUserProps) {
  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'}>
      <Stack align={'center'}>
        <Heading fontSize={'2xl'}>Usuário não conectado</Heading>
        <Text fontSize={'lg'} color={'gray.600'}>
          <Link color={'blue'} onClick={onSignIn}>
            conecte-se
          </Link>{' '}
          com o seu usuário e senha para ter acesso a este recurso
        </Text>
      </Stack>
    </Flex>
  )
}
