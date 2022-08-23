import env from '../config/env'
import { AuthenticationFetchRepository } from '../../infra/repositories/fetch/authentication-fetch-repository'
import { SignUpService } from '../../domain/services/sign-up-service'
import { SignedUserSessionStorageRepository } from '../../infra/repositories/session-storage/signed-user-session-storage-repository'

export const makeSignUpService = () => {
  const authenticationRepository = new AuthenticationFetchRepository(
    env.serverHostAddress
  )
  const signedUserRepository = new SignedUserSessionStorageRepository()
  return new SignUpService(authenticationRepository, signedUserRepository)
}
