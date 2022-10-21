import {
  Flex,
  HStack,
  IconButton,
  Link,
  Box,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useColorModeValue
} from '@chakra-ui/react'
import { AiOutlineBell, AiOutlineDown } from 'react-icons/ai'
import { User } from '../../../domain'
import { SignOutMenuItem } from '../auth'
import { If } from '../utils'
import { UserAvatar } from './UserAvatar'
import { UserInfo } from './UserInfo'

export interface UserMenuProps {
  user?: User
  isLoading: boolean
  onConfirmEmail: () => void
  onSignOut: () => Promise<void>
  onSignIn: () => void
}

export function UserMenu({
  user,
  isLoading,
  onConfirmEmail,
  onSignIn,
  onSignOut
}: UserMenuProps) {
  return (
    <If
      condition={Boolean(user)}
      or={
        <Link color={'blue'} onClick={onSignIn}>
          Entrar
        </Link>
      }
    >
      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<AiOutlineBell />}
        />
        <Flex alignItems={'center'}>
          <Menu closeOnSelect={false}>
            <MenuButton
              className="user-menu-button"
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}
            >
              <HStack>
                <UserAvatar />
                <UserInfo user={user!} />
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
              {!user?.confirmedEmail && (
                <MenuItem>
                  <Link color={'red'} onClick={onConfirmEmail}>
                    Confirmar e-mail
                  </Link>
                </MenuItem>
              )}
              <MenuItem>Perfil</MenuItem>
              <MenuDivider />
              <SignOutMenuItem onSignOut={onSignOut} isSigningOut={isLoading} />
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </If>
  )
}
