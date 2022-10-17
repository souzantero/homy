import { Button, ButtonProps } from '@chakra-ui/react'

export interface NavButtonProps extends ButtonProps {
  onNavigate: () => void
}

export function NavButton({ onNavigate, children, ...rest }: NavButtonProps) {
  return (
    <Button
      {...rest}
      color={'blue'}
      borderColor={'blue'}
      variant={'outline'}
      size={'sm'}
      onClick={onNavigate}
    >
      {children}
    </Button>
  )
}
