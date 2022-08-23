import env from '../config/env'
import { AuthenticationFetchRepository } from '../../infra/repositories/fetch/authentication-fetch-repository'
import { SignedUserLocalStorageRepository } from '../../infra/repositories/local-storage/signed-user-local-storage-repository'
import { SignUpService } from '../../domain/services/sign-up-service'

export const makeSignUpService = () => {
  const authenticationRepository = new AuthenticationFetchRepository(
    env.serverHostAddress
  )
  const signedUserRepository = new SignedUserLocalStorageRepository()
  return new SignUpService(authenticationRepository, signedUserRepository)
}
