import { ConfirmUserEmailRepository } from '../../../domain'
import { UserFetchRepository } from '../../../infra'
import env from '../../config/env'

export function makeConfirmUserEmailRepository(): ConfirmUserEmailRepository {
  return new UserFetchRepository(env.serverHostAddress)
}
