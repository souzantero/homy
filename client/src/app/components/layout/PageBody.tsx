import { PropsWithChildren } from 'react'
import { Box } from '@chakra-ui/react'

export function PageBody({ children }: PropsWithChildren) {
  return <Box padding={2}>{children}</Box>
}
