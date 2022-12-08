import { SignInRepository } from '../repositories/sign-in-repository'
import { SignedUser } from './signed-user'

export class SignIn {
  constructor(
    private readonly signInRepository: SignInRepository,
    private readonly signedUser: SignedUser
  ) {}

  async signIn(params: SignIn.Params): Promise<SignIn.Result> {
    const signedUser = await this.signInRepository.signIn(params)
    await this.signedUser.set(signedUser)
    return signedUser
  }
}

export namespace SignIn {
  export type Params = SignInRepository.Params
  export type Result = SignInRepository.Result
}
