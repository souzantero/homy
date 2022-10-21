import { ReactElement } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import {
  IconButton,
  Flex,
  useColorModeValue,
  Text,
  FlexProps
} from '@chakra-ui/react'
import { UserMenuProps } from '../user'

export interface HeaderProps extends FlexProps {
  userMenu: ReactElement<UserMenuProps>
  onOpen: () => void
}

export const Header = ({ userMenu, onOpen, ...rest }: HeaderProps) => {
  return (
    <Flex
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{
        base: 'space-between',
        md: 'flex-end'
      }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<AiOutlineMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Retaily
      </Text>

      {userMenu}
    </Flex>
  )
}
