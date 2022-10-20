import { Text, VStack } from '@chakra-ui/react'
import { Role, User } from '../../../domain'

const RoleText = {
  [Role.Admin]: 'Administrador',
  [Role.User]: 'Usuário'
}

export interface UserInfoProps {
  user: User
}

export function UserInfo({ user }: UserInfoProps) {
  return (
    <VStack
      display={{ base: 'none', md: 'flex' }}
      alignItems="flex-start"
      spacing="1px"
      ml="2"
    >
      <Text fontSize="sm">{user.name}</Text>
      <Text fontSize="xs" color="gray.600">
        {RoleText[user.role]}
      </Text>
    </VStack>
  )
}
