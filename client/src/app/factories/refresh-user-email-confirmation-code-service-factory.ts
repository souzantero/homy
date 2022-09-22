import { RefreshUserEmailConfirmationCodeService } from '../../domain/services/refresh-user-email-confirmation-code-service'
import { UserFetchRepository } from '../../infra/repositories/fetch/user-fetch-repository'
import env from '../config/env'

export const makeRefreshUserEmailConfirmationCodeService = () => {
  const userRepository = new UserFetchRepository(env.serverHostAddress)
  return new RefreshUserEmailConfirmationCodeService(userRepository)
}
