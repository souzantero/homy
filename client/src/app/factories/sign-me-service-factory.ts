import { User } from '../../domain/models/user'
import { SignMeService } from '../../domain/services/sign-me-service'
import { AuthenticationFetchRepository } from '../../infra/repositories/fetch/authentication-fetch-repository'
import { SignedUserLocalStorageRepository } from '../../infra/repositories/local-storage/signed-user-local-storage-repository'
import { SignedUserSessionStorageRepository } from '../../infra/repositories/session-storage/signed-user-session-storage-repository'
import env from '../config/env'

export const makeSignMeService = (signedUser: User, remind: boolean) => {
  const authenticationRepository = new AuthenticationFetchRepository(
    env.serverHostAddress,
    signedUser.authorizationToken
  )

  const signedUserRepository = remind
    ? new SignedUserLocalStorageRepository()
    : new SignedUserSessionStorageRepository()

  return new SignMeService(authenticationRepository, signedUserRepository)
}
