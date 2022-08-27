import { Skeleton } from '@chakra-ui/react'
import { PropsWithChildren, ReactNode, useMemo } from 'react'
import { Role } from '../../../domain/models/user'
import { useSignedUser } from '../../hooks/useSignedUser'

export interface AuthorizationProps {
  roles: Role[]
  unauthorized?: ReactNode
}

export function Authorization({
  roles,
  unauthorized,
  children
}: PropsWithChildren<AuthorizationProps>) {
  const { signedUser, isLoading } = useSignedUser()
  const authorized = useMemo(
    () => roles.some((role) => role === signedUser?.role),
    [signedUser]
  )

  if (isLoading) return <Skeleton />
  if (!isLoading && !signedUser) return <></>
  if (!authorized && unauthorized) return <>{unauthorized}</>
  if (!authorized) return <></>
  return <>{children}</>
}
