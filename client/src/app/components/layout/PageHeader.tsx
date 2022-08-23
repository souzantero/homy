import { Divider, Flex, Heading, Spacer } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

export interface PageHeaderProps {
  title?: string
}

export function PageHeader({
  title,
  children
}: PropsWithChildren<PageHeaderProps>) {
  return (
    <>
      <Flex padding={2} minWidth="max-content" alignItems="center" gap="2">
        {title && <Heading size={'md'}>{title}</Heading>}
        <Spacer />
        {children}
      </Flex>
      <Divider margin={4} />
    </>
  )
}
