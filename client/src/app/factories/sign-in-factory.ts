import env from '../config/env'
import { SignIn } from '../../domain/services/sign-in'
import { AuthenticationFetchRepository } from '../../infra/repositories/fetch/authentication-fetch-repository'
import { SignedUserSessionStorageRepository } from '../../infra/repositories/session-storage/signed-user-session-storage-repository'
import { SignedUserLocalStorageRepository } from '../../infra/repositories/local-storage/signed-user-local-storage-repository'

export const makeSignIn = (remind: boolean) => {
  const authenticationRepository = new AuthenticationFetchRepository(
    env.serverHostAddress
  )
  const signedUserRepository = remind
    ? new SignedUserLocalStorageRepository()
    : new SignedUserSessionStorageRepository()
  return new SignIn(authenticationRepository, signedUserRepository)
}
