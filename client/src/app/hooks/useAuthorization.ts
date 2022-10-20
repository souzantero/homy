import { useMemo } from 'react'
import { Role } from '../../domain'
import { useSignedUser } from './useSignedUser'

export function useAuthorization(...roles: Role[]): {
  isAuthorized: boolean
} {
  const { signedUser } = useSignedUser()
  const isAuthorized = useMemo(
    () => roles.some((role) => role === signedUser?.role),
    [signedUser]
  )

  return { isAuthorized }
}
