import { ResetUserPassword } from '../../../domain/services/reset-user-password'
import { UserFetchRepository } from '../../../infra'
import env from '../../config/env'

export const makeResetUserPassword = (authorizationToken: string) => {
  const userFetchRepository = new UserFetchRepository(
    env.serverHostAddress,
    authorizationToken
  )
  return new ResetUserPassword(userFetchRepository)
}
