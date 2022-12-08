import { PasswordsDoesNotMatchError } from '../errors/passwords-does-not-match-error'
import { SignUpRepository } from '../repositories/sign-up-repository'
import { SignedUser } from './signed-user'

export class SignUp {
  constructor(
    private readonly signUpRepository: SignUpRepository,
    private readonly signedUser: SignedUser
  ) {}

  async signUp({
    name,
    email,
    password,
    confirmedPassword
  }: SignUp.Params): Promise<SignUp.Result> {
    if (password !== confirmedPassword) {
      throw new PasswordsDoesNotMatchError()
    }

    const signedUser = await this.signUpRepository.signUp({
      name,
      email,
      password
    })
    await this.signedUser.set(signedUser)
    return signedUser
  }
}

export namespace SignUp {
  export type Params = {
    name: string
    email: string
    password: string
    confirmedPassword: string
  }

  export type Result = SignUpRepository.Result
}
