import { Box } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

export function PageBody({ children }: PropsWithChildren) {
  return <Box padding={2}>{children}</Box>
}
