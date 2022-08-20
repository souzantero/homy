import { Skeleton } from "@chakra-ui/react"
import { PropsWithChildren, ReactNode, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSignedUser } from "../../../hooks/useSignedUser"

export interface SignedProps {
  redirect?: boolean
  unsigned?: ReactNode
}

export function Signed({
  redirect,
  unsigned,
  children
}: PropsWithChildren<SignedProps>) {
  const { signedUser, isLoading } = useSignedUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (redirect && !signedUser && !isLoading) {
      navigate('/auth/sign-in')
    }
  }, [signedUser, isLoading])

  if (isLoading) return <Skeleton/>
  if (!isLoading && !signedUser && unsigned) return (<>{unsigned}</>)
  if (!isLoading && !signedUser) return (<></>)
  return (<>{children}</>)
}