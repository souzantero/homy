import { ForgetUserPassword } from '../../domain'
import { UserFetchRepository } from '../../infra'
import env from '../config/env'

export const makeForgetUserPassword = () => {
  const userRepository = new UserFetchRepository(env.serverHostAddress)
  return new ForgetUserPassword(userRepository)
}
