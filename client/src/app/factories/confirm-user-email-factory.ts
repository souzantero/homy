import { ConfirmUserEmail } from '../../domain'
import { UserFetchRepository } from '../../infra'
import env from '../config/env'

export const makeConfirmUserEmail = () => {
  const userRepository = new UserFetchRepository(env.serverHostAddress)
  return new ConfirmUserEmail(userRepository)
}
