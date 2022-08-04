import { Button, ButtonProps } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export interface NavButtonProps extends ButtonProps {
  to: string
}

export function NavButton({
  to,
  children
}: NavButtonProps) {
  const navigate = useNavigate()
  const handleClickAdd = () => navigate(to)
  return (
    <Button 
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