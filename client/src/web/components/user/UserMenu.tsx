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
import { User } from '../../../domain'
import { SignOutMenuItem } from '../auth'
import { UserAvatar } from './UserAvatar'
import { UserInfo } from './UserInfo'

export interface UserMenuProps {
  user: User
  onConfirmEmail: () => void
  onSignOut: () => Promise<void>
  isSigningOut: boolean
}

export function UserMenu({
  user,
  onConfirmEmail,
  onSignOut,
  isSigningOut
}: UserMenuProps) {
  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        className="user-menu-button"
        py={2}
        transition="all 0.3s"
        _focus={{ boxShadow: 'none' }}
      >
        <HStack>
          <UserAvatar />
          <UserInfo user={user} />
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
        {!user.confirmedEmail && (
          <MenuItem>
            <Link color={'red'} onClick={onConfirmEmail}>
              Confirmar e-mail
            </Link>
          </MenuItem>
        )}
        <MenuItem>Perfil</MenuItem>
        <MenuDivider />
        <SignOutMenuItem onSignOut={onSignOut} isSigningOut={isSigningOut} />
      </MenuList>
    </Menu>
  )
}
