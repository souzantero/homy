import { ConfirmUserEmail } from '@retailer/client/domain'
import { UserFetchRepository } from '@retailer/client/infra'
import env from '../config/env'

export const makeConfirmUserEmail = () => {
  const userRepository = new UserFetchRepository(env.serverHostAddress)
  return new ConfirmUserEmail(userRepository)
}
