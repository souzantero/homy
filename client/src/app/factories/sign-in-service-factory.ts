import env from '../config/env'
import { SignInService } from '../../domain/services/sign-in-service'
import { AuthenticationFetchRepository } from '../../infra/repositories/fetch/authentication-fetch-repository'
import { SignedUserLocalStorageRepository } from '../../infra/repositories/local-storage/signed-user-local-storage-repository'

export const makeSignInService = () => {
  const authenticationRepository = new AuthenticationFetchRepository(
    env.serverHostAddress
  )
  const signedUserRepository = new SignedUserLocalStorageRepository()
  return new SignInService(authenticationRepository, signedUserRepository)
}
