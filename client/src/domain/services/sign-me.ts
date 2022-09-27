import { SignMeRepository } from '../repositories/sign-me-repository'
import { UpdateSignedUserRepository } from '../repositories/update-signed-user-repository'

export class SignMe {
  constructor(
    private readonly signMeRepository: SignMeRepository,
    private readonly updateSignedUserRepository: UpdateSignedUserRepository
  ) {}

  async signMe(): Promise<SignMe.Result> {
    const signedUser = await this.signMeRepository.signMe()
    await this.updateSignedUserRepository.updateSignedUser(signedUser)
    return signedUser
  }
}

export namespace SignMe {
  export type Result = SignMeRepository.Result
}
