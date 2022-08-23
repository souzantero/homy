import {
  Box,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useColorModeValue
} from '@chakra-ui/react'
import { AiOutlineDown } from 'react-icons/ai'
import { SignOutMenuItem } from '../auth/sign-out/SignOutMenuItem'
import { SignedUserAvatar } from './SignedUserAvatar'
import { SignedUserInfo } from './SignedUserInfo'

export function SignedUserMenu() {
  return (
    <Menu>
      <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
        <HStack>
          <SignedUserAvatar />
          <SignedUserInfo />
          <Box display={{ base: 'none', md: 'flex' }}>
            <AiOutlineDown />
          </Box>
        </HStack>
      </MenuButton>
      <MenuList
        bg={useColorModeValue('white', 'gray.900')}
        borderColor={useColorModeValue('gray.200', 'gray.700')}
      >
        <MenuItem>Perfil</MenuItem>
        <MenuDivider />
        <SignOutMenuItem />
      </MenuList>
    </Menu>
  )
}
