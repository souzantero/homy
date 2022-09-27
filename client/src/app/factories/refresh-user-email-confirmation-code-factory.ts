import { RefreshUserEmailConfirmationCode } from '../../domain/services/refresh-user-email-confirmation-code'
import { UserFetchRepository } from '../../infra/repositories/fetch/user-fetch-repository'
import env from '../config/env'

export const makeRefreshUserEmailConfirmationCode = () => {
  const userRepository = new UserFetchRepository(env.serverHostAddress)
  return new RefreshUserEmailConfirmationCode(userRepository)
}
