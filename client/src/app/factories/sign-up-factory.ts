import { SignUp } from '@retailer/client/domain'
import {
  AuthenticationFetchRepository,
  SignedUserSessionStorageRepository
} from '@retailer/client/infra'
import env from '../config/env'

export const makeSignUp = () => {
  const authenticationRepository = new AuthenticationFetchRepository(
    env.serverHostAddress
  )
  const signedUserRepository = new SignedUserSessionStorageRepository()
  return new SignUp(authenticationRepository, signedUserRepository)
}
