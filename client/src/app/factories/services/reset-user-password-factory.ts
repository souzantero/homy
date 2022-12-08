import { ResetUserPassword } from '../../../domain/services/reset-user-password'
import { makeResetUserPasswordRepository } from '../repositories'

export function makeResetUserPassword(
  authorizationToken: string
): ResetUserPassword {
  return new ResetUserPassword(
    makeResetUserPasswordRepository(authorizationToken)
  )
}
