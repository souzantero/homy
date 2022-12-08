import { SignUp } from '../../../domain'
import { AuthenticationFetchRepository } from '../../../infra'
import env from '../../config/env'
import { makeSignedUser } from './signed-user-factory'

export const makeSignUp = () => {
  const authenticationRepository = new AuthenticationFetchRepository(
    env.serverHostAddress
  )
  return new SignUp(authenticationRepository, makeSignedUser())
}
