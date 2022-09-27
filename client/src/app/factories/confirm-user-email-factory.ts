import { ConfirmUserEmail } from '@retaily/client/domain'
import { UserFetchRepository } from '@retaily/client/infra'
import env from '../config/env'

export const makeConfirmUserEmail = () => {
  const userRepository = new UserFetchRepository(env.serverHostAddress)
  return new ConfirmUserEmail(userRepository)
}
