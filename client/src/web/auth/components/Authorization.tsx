import {
  Children,
  cloneElement,
  isValidElement,
  PropsWithChildren,
  ReactNode,
  useMemo
} from 'react'
import { Skeleton } from '@chakra-ui/react'
import { Role } from '../../../domain'
import { useSignedUser } from '../hooks'

export interface AuthorizationProps {
  roles: Role[]
  disable?: boolean
  unauthorized?: ReactNode
}

export function Authorization({
  roles,
  disable,
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
  if (!authorized && disable)
    return (
      <>
        {Children.map(children, (child) => {
          if (isValidElement(child)) {
            return cloneElement(child, { isDisabled: true })
          }

          return child
        })}
      </>
    )

  if (!authorized) return <></>
  return <>{children}</>
}
