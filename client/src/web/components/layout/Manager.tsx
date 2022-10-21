import React from 'react'
import { Box, Drawer, DrawerContent, useColorModeValue } from '@chakra-ui/react'
import { PropsWithChildren, ReactElement } from 'react'
import { HeaderProps } from './Header'
import { SidebarProps } from './Sidebar'

export interface ManagerProps {
  isOpen: boolean
  onClose: () => void
  sidebar: ReactElement<SidebarProps>
  header: ReactElement<HeaderProps>
}

export function Manager({
  isOpen,
  onClose,
  sidebar,
  header,
  children
}: PropsWithChildren<ManagerProps>) {
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      {React.Children.map(sidebar, (child) =>
        React.cloneElement(child, {
          display: { base: 'none', md: 'block' }
        })
      )}
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>{sidebar}</DrawerContent>
      </Drawer>
      {header}
      <Box ml={{ base: 0, md: 60 }} p="4" as="main">
        {children}
      </Box>
    </Box>
  )
}
