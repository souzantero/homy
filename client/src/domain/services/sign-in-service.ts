import { SignInRepository } from "../repositories/sign-in-repository"
import { UpdateSignedUserRepository } from "../repositories/update-signed-user-repository"

export class SignInService {
  constructor(
    private readonly signInRepository: SignInRepository,
    private readonly updateSignedUserRepository: UpdateSignedUserRepository
  ) { }

  async signIn(params: SignInService.Params): Promise<SignInService.Result> {
    const signedUser = await this.signInRepository.signIn(params)
    await this.updateSignedUserRepository.updateSignedUser(signedUser)
    return signedUser
  }
}

export namespace SignInService {
  export type Params = SignInRepository.Params
  export type Result = SignInRepository.Result
}