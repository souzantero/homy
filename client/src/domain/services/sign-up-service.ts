
import { SignUpRepository } from '../repositories/sign-up-repository'
import { UpdateSignedUserRepository } from '../repositories/update-signed-user-repository'

export class SignUpService {
  constructor(
    private readonly signUpRepository: SignUpRepository,
    private readonly updateSignedUserRepository: UpdateSignedUserRepository
  ) { }

  async signUp({
    name,
    email,
    password,
    confirmedPassword
  }: SignUpService.Params): Promise<SignUpService.Result> {
    if (password !== confirmedPassword) {
      throw new Error('passwords does not match')
    }

    const signedUser = await this.signUpRepository.signUp({ name, email, password })
    await this.updateSignedUserRepository.updateSignedUser(signedUser)
    return signedUser
  }
}

export namespace SignUpService {
  export type Params = {
    name: string
    email: string
    password: string
    confirmedPassword: string
  }

  export type Result = SignUpRepository.Result
}
