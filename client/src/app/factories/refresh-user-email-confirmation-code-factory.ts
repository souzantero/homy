import { RefreshUserEmailConfirmationCode } from '@retaily/client/domain'
import { UserFetchRepository } from '@retaily/client/infra'
import env from '../config/env'

export const makeRefreshUserEmailConfirmationCode = () => {
  const userRepository = new UserFetchRepository(env.serverHostAddress)
  return new RefreshUserEmailConfirmationCode(userRepository)
}
