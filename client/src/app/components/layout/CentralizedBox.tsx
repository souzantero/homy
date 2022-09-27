import { PropsWithChildren, ReactNode } from 'react'
import {
  Box,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react'

export interface CentralizedBoxProps {
  title: string
  subtitle: string | ReactNode
}

export function CentralizedBox({
  title,
  subtitle,
  children
}: PropsWithChildren<CentralizedBoxProps>) {
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
            {subtitle}
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
