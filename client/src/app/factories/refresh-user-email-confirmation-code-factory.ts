import { RefreshUserEmailConfirmationCode } from '@retailer/client/domain'
import { UserFetchRepository } from '@retailer/client/infra'
import env from '../config/env'

export const makeRefreshUserEmailConfirmationCode = () => {
  const userRepository = new UserFetchRepository(env.serverHostAddress)
  return new RefreshUserEmailConfirmationCode(userRepository)
}
