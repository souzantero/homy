import { Link as RouterLink } from 'react-router-dom'
import {
  Box,
  HStack,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useColorModeValue
} from '@chakra-ui/react'
import { AiOutlineDown } from 'react-icons/ai'
import { SignOutMenuItem, useSignedUser } from '../../auth'
import { SignedUserAvatar } from './SignedUserAvatar'
import { SignedUserInfo } from './SignedUserInfo'

export function SignedUserMenu() {
  const { signedUser } = useSignedUser()

  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        className="user-menu-button"
        py={2}
        transition="all 0.3s"
        _focus={{ boxShadow: 'none' }}
      >
        <HStack>
          <SignedUserAvatar />
          <SignedUserInfo />
          <Box display={{ base: 'none', md: 'flex' }}>
            <AiOutlineDown />
          </Box>
        </HStack>
      </MenuButton>
      <MenuList
        className="user-menu-list"
        bg={useColorModeValue('white', 'gray.900')}
        borderColor={useColorModeValue('gray.200', 'gray.700')}
      >
        {signedUser && !signedUser.confirmedEmail && (
          <MenuItem>
            <Link
              as={RouterLink}
              to={`/users/confirm-email?email=${signedUser.email}`}
              color={'red'}
            >
              Confirmar e-mail
            </Link>
          </MenuItem>
        )}
        <MenuItem>Perfil</MenuItem>
        <MenuDivider />
        <SignOutMenuItem />
      </MenuList>
    </Menu>
  )
}
