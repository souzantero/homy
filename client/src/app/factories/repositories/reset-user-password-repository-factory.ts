import { ResetUserPasswordRepository } from '../../../domain/repositories/reset-user-password-repository'
import { UserFetchRepository } from '../../../infra'
import env from '../../config/env'

export function makeResetUserPasswordRepository(
  authorizationToken: string
): ResetUserPasswordRepository {
  return new UserFetchRepository(env.serverHostAddress, authorizationToken)
}
