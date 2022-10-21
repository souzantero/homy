import { Flex, FlexProps, Icon, Link } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { IconType } from 'react-icons'

export interface NavItemProps extends FlexProps {
  icon: IconType
  onClick: () => void
  children: ReactNode
}

export const NavItem = ({ icon, onClick, children, ...rest }: NavItemProps) => {
  return (
    <Link
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
      onClick={onClick}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'blue',
          color: 'white'
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white'
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  )
}
