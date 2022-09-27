import { SignUpRepository } from '../repositories/sign-up-repository'
import { UpdateSignedUserRepository } from '../repositories/update-signed-user-repository'

export class SignUp {
  constructor(
    private readonly signUpRepository: SignUpRepository,
    private readonly updateSignedUserRepository: UpdateSignedUserRepository
  ) {}

  async signUp({
    name,
    email,
    password,
    confirmedPassword
  }: SignUp.Params): Promise<SignUp.Result> {
    if (password !== confirmedPassword) {
      throw new Error('passwords does not match')
    }

    const signedUser = await this.signUpRepository.signUp({
      name,
      email,
      password
    })
    await this.updateSignedUserRepository.updateSignedUser(signedUser)
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
