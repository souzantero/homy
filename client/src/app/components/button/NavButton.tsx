import { useNavigate } from 'react-router-dom'
import { Button, ButtonProps } from '@chakra-ui/react'

export interface NavButtonProps extends ButtonProps {
  to: string
}

export function NavButton({ to, children, ...rest }: NavButtonProps) {
  const navigate = useNavigate()
  const handleClickAdd = () => navigate(to)
  return (
    <Button
      {...rest}
      color={'blue'}
      borderColor={'blue'}
      variant={'outline'}
      size={'sm'}
      onClick={handleClickAdd}
    >
      {children}
    </Button>
  )
}
