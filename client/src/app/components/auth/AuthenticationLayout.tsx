import {
  Box,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

export interface AuthenticationLayoutProps {
  title: string
}

export function AuthenticationLayout({
  title,
  children
}: PropsWithChildren<AuthenticationLayoutProps>) {
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>{title}</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            para aproveitar todas as nossas{' '}
            <Link color={'blue'}>funcionalidades</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          {children}
        </Box>
      </Stack>
    </Flex>
  )
}
