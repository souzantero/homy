import { Skeleton, Text, VStack } from '@chakra-ui/react'
import { useSignedUser } from '../../hooks/useSignedUser'

export function SignedUserInfo() {
  const { signedUser, isLoading } = useSignedUser()

  return (
    <VStack
      display={{ base: 'none', md: 'flex' }}
      alignItems="flex-start"
      spacing="1px"
      ml="2"
    >
      {isLoading ? <Skeleton /> : <Text fontSize="sm">{signedUser?.name}</Text>}
      {isLoading ? (
        <Skeleton />
      ) : (
        <Text fontSize="xs" color="gray.600">
          Admin
        </Text>
      )}
    </VStack>
  )
}
