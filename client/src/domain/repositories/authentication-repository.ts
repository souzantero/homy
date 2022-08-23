import { SignInRepository } from './sign-in-repository'
import { SignUpRepository } from './sign-up-repository'

export interface AuthenticationRepository
  extends SignInRepository,
    SignUpRepository {}
