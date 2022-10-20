import { Button, ButtonProps } from '@chakra-ui/react'

export function ActionButton({ children, ...rest }: ButtonProps) {
  return (
    <Button
      {...rest}
      color={'green'}
      borderColor={'green'}
      variant={'outline'}
      size={'sm'}
    >
      {children}
    </Button>
  )
}
