import { ForgetUserPasswordRepository } from '../../../domain'
import { UserFetchRepository } from '../../../infra'
import env from '../../config/env'

export function makeForgetUserPasswordRepository(): ForgetUserPasswordRepository {
  return new UserFetchRepository(env.serverHostAddress)
}
