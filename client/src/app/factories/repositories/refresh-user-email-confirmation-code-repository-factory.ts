import { RefreshUserEmailConfirmationCodeRepository } from '../../../domain'
import { UserFetchRepository } from '../../../infra'
import env from '../../config/env'

export function makeRefreshUserEmailConfirmationCodeRepository(): RefreshUserEmailConfirmationCodeRepository {
  return new UserFetchRepository(env.serverHostAddress)
}
