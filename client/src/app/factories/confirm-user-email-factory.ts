import { ConfirmUserEmail } from '../../domain/services/confirm-user-email'
import { UserFetchRepository } from '../../infra/repositories/fetch/user-fetch-repository'
import env from '../config/env'

export const makeConfirmUserEmail = () => {
  const userRepository = new UserFetchRepository(env.serverHostAddress)
  return new ConfirmUserEmail(userRepository)
}
