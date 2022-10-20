import { User, SignOut } from '../../../domain'
import {
  AuthenticationFetchRepository,
  SignedUserStorageRepository,
  SignedUserSessionStorageRepository,
  SignedUserLocalStorageRepository
} from '../../../infra'
import env from '../../config/env'

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
