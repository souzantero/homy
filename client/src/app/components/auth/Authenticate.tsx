import { Skeleton } from "@chakra-ui/react"
import { PropsWithChildren, ReactNode, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSignedUser } from "../../hooks/useSignedUser"

export interface AuthenticateProps {
  redirect?: boolean
  unauthenticated?: ReactNode
}

export function Authenticate({
  redirect,
  unauthenticated,
  children
}: PropsWithChildren<AuthenticateProps>) {
  const { signedUser, isLoading } = useSignedUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (redirect && !signedUser && !isLoading) {
      navigate('/auth/sign-in')
    }
  }, [signedUser, isLoading])

  if (isLoading) return <Skeleton/>
  if (!isLoading && !signedUser && unauthenticated) return (<>{unauthenticated}</>)
  if (!isLoading && !signedUser) return (<></>)
  return (<>{children}</>)
}