import env from '../config/env'
import { SignIn } from '../../domain/services/sign-in'
import {
  AuthenticationFetchRepository,
  SignedUserSessionStorageRepository,
  SignedUserLocalStorageRepository
} from '@retaily/client/infra'

export const makeSignIn = (remind: boolean) => {
  const authenticationRepository = new AuthenticationFetchRepository(
    env.serverHostAddress
  )
  const signedUserRepository = remind
    ? new SignedUserLocalStorageRepository()
    : new SignedUserSessionStorageRepository()
  return new SignIn(authenticationRepository, signedUserRepository)
}
