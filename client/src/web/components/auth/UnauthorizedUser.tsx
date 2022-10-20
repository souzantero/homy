import { Flex, Heading, Stack, Text } from '@chakra-ui/react'

export function UnauthorizedUser() {
  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'}>
      <Stack align={'center'}>
        <Heading fontSize={'2xl'}>Usuário não autorizado</Heading>
        <Text fontSize={'lg'} color={'gray.600'}>
          sua conta de usuário não possui as permissões necessárias para acessar
          este recurso
        </Text>
      </Stack>
    </Flex>
  )
}
