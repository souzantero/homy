import { PropsWithChildren } from 'react'

import {
  Box,
  BoxProps,
  CloseButton,
  Flex,
  Text,
  useColorModeValue
} from '@chakra-ui/react'

export interface SidebarProps extends BoxProps {
  title: string
  onClose: () => void
}

export const Sidebar = ({
  title,
  onClose,
  children,
  ...rest
}: PropsWithChildren<SidebarProps>) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          {title}
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {children}
    </Box>
  )
}
