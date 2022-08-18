import { SignInRepository } from "../repositories/sign-in-repository"

export class SignIn {
  constructor(
    private readonly signInRepository: SignInRepository
  ) { }

  signIn(params: SignIn.Params): Promise<SignIn.Result> {
    return this.signInRepository.signIn(params)
  }
}

export namespace SignIn {
  export type Params = SignInRepository.Params
  export type Result = SignInRepository.Result
}