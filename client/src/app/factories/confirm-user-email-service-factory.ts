import { ConfirmUserEmailService } from '../../domain/services/confirm-user-email-service'
import { UserFetchRepository } from '../../infra/repositories/fetch/user-fetch-repository'
import env from '../config/env'

export const makeConfirmUserEmailService = () => {
  const userRepository = new UserFetchRepository(env.serverHostAddress)

  return new ConfirmUserEmailService(userRepository)
}
