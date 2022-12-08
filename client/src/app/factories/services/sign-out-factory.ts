import { User, SignOut } from '../../../domain'
import { AuthenticationFetchRepository } from '../../../infra'
import env from '../../config/env'
import { makeSignedUser } from './signed-user-factory'

export const makeSignOut = (signedUser: User) => {
  const authenticationRepository = new AuthenticationFetchRepository(
    env.serverHostAddress,
    signedUser.authorizationToken
  )

  return new SignOut(authenticationRepository, makeSignedUser())
}
