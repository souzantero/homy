import { Link } from "@chakra-ui/react"
import { PropsWithChildren } from "react"
import { Link as RouterLink } from 'react-router-dom'

export function SignInLink({
  children
}: PropsWithChildren) {
  return (
    <Link as={RouterLink} to={'/auth/sign-in'} color={'blue'}>{children}</Link>
  )
}