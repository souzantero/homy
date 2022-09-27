import env from '../config/env'
import { AuthenticationFetchRepository } from '../../infra/repositories/fetch/authentication-fetch-repository'
import { SignUp } from '../../domain/services/sign-up'
import { SignedUserSessionStorageRepository } from '../../infra/repositories/session-storage/signed-user-session-storage-repository'

export const makeSignUp = () => {
  const authenticationRepository = new AuthenticationFetchRepository(
    env.serverHostAddress
  )
  const signedUserRepository = new SignedUserSessionStorageRepository()
  return new SignUp(authenticationRepository, signedUserRepository)
}
