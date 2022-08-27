import { Skeleton, Text, VStack } from '@chakra-ui/react'
import { Role } from '../../../domain/models/user'
import { useSignedUser } from '../../hooks/useSignedUser'

const RoleText = {
  [Role.Admin]: 'Administrador',
  [Role.User]: 'Usuário'
}

export function SignedUserInfo() {
  const { signedUser, isLoading } = useSignedUser()

  return (
    <VStack
      display={{ base: 'none', md: 'flex' }}
      alignItems="flex-start"
      spacing="1px"
      ml="2"
    >
      {isLoading && !signedUser ? (
        <Skeleton />
      ) : (
        <Text fontSize="sm">{signedUser!.name}</Text>
      )}

      {isLoading && !signedUser ? (
        <Skeleton />
      ) : (
        <Text fontSize="xs" color="gray.600">
          {RoleText[signedUser!.role]}
        </Text>
      )}
    </VStack>
  )
}
