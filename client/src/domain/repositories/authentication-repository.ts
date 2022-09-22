import { SignInRepository } from './sign-in-repository'
import { SignMeRepository } from './sign-me-repository'
import { SignOutRepository } from './sign-out-repository'
import { SignUpRepository } from './sign-up-repository'

export interface AuthenticationRepository
  extends SignInRepository,
    SignUpRepository,
    SignOutRepository,
    SignMeRepository {}
