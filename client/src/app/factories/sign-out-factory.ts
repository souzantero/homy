import env from '../config/env'
import { SignedUserLocalStorageRepository } from '../../infra/repositories/local-storage/signed-user-local-storage-repository'
import { SignOut } from '../../domain/services/sign-out'
import { SignedUserStorageRepository } from '../../infra/repositories/storage/signed-user-storage-repository'
import { SignedUserSessionStorageRepository } from '../../infra/repositories/session-storage/signed-user-session-storage-repository'
import { AuthenticationFetchRepository } from '../../infra/repositories/fetch/authentication-fetch-repository'
import { User } from '../../domain/models/user'

export const makeSignOut = (signedUser: User) => {
  const authenticationRepository = new AuthenticationFetchRepository(
    env.serverHostAddress,
    signedUser.authorizationToken
  )
  const signedUserLocalStorageRepository =
    new SignedUserLocalStorageRepository()
  const signedUserSessionStorageRepository =
    new SignedUserSessionStorageRepository()
  const signedUserRepository = new SignedUserStorageRepository(
    signedUserLocalStorageRepository,
    signedUserSessionStorageRepository
  )
  return new SignOut(authenticationRepository, signedUserRepository)
}
