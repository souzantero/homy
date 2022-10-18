import { SignUp } from '../../domain'
import {
  AuthenticationFetchRepository,
  SignedUserSessionStorageRepository
} from '../../infra'
import env from '../config/env'

export const makeSignUp = () => {
  const authenticationRepository = new AuthenticationFetchRepository(
    env.serverHostAddress
  )
  const signedUserRepository = new SignedUserSessionStorageRepository()
  return new SignUp(authenticationRepository, signedUserRepository)
}
