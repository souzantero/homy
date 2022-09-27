import { SignInRepository } from '../repositories/sign-in-repository'
import { UpdateSignedUserRepository } from '../repositories/update-signed-user-repository'

export class SignIn {
  constructor(
    private readonly signInRepository: SignInRepository,
    private readonly updateSignedUserRepository: UpdateSignedUserRepository
  ) {}

  async signIn(params: SignIn.Params): Promise<SignIn.Result> {
    const signedUser = await this.signInRepository.signIn(params)
    await this.updateSignedUserRepository.updateSignedUser(signedUser)
    return signedUser
  }
}

export namespace SignIn {
  export type Params = SignInRepository.Params
  export type Result = SignInRepository.Result
}
