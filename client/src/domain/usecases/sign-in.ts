import { SignInRepository } from "../repositories/sign-in-repository"
import { UpdateUserRepository } from "../repositories/update-user-repository"

export class SignIn {
  constructor(
    private readonly signInRepository: SignInRepository,
    private readonly updateUserRepository: UpdateUserRepository
  ) { }

  async signIn(params: SignIn.Params): Promise<SignIn.Result> {
    const signedUser = await this.signInRepository.signIn(params)
    const { id, ...data } = signedUser
    await this.updateUserRepository.updateById(id, data)
    return signedUser
  }
}

export namespace SignIn {
  export type Params = SignInRepository.Params
  export type Result = SignInRepository.Result
}