import { User, SignMe } from '@retailer/client/domain'
import {
  AuthenticationFetchRepository,
  SignedUserSessionStorageRepository,
  SignedUserLocalStorageRepository
} from '@retailer/client/infra'
import env from '../config/env'

export const makeSignMe = (signedUser: User, remind: boolean) => {
  const authenticationRepository = new AuthenticationFetchRepository(
    env.serverHostAddress,
    signedUser.authorizationToken
  )

  const signedUserRepository = remind
    ? new SignedUserLocalStorageRepository()
    : new SignedUserSessionStorageRepository()

  return new SignMe(authenticationRepository, signedUserRepository)
}
