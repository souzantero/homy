import env from '../config/env'
import { SignInService } from '../../domain/services/sign-in-service'
import { AuthenticationFetchRepository } from '../../infra/repositories/fetch/authentication-fetch-repository'
import { SignedUserSessionStorageRepository } from '../../infra/repositories/session-storage/signed-user-session-storage-repository'

export const makeSignInService = () => {
  const authenticationRepository = new AuthenticationFetchRepository(
    env.serverHostAddress
  )
  const signedUserRepository = new SignedUserSessionStorageRepository()
  return new SignInService(authenticationRepository, signedUserRepository)
}
