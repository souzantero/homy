import { SignMeRepository } from '../repositories/sign-me-repository'
import { UpdateSignedUserRepository } from '../repositories/update-signed-user-repository'

export class SignMeService {
  constructor(
    private readonly signMeRepository: SignMeRepository,
    private readonly updateSignedUserRepository: UpdateSignedUserRepository
  ) {}

  async signMe(): Promise<SignMeService.Result> {
    const signedUser = await this.signMeRepository.signMe()
    await this.updateSignedUserRepository.updateSignedUser(signedUser)
    return signedUser
  }
}

export namespace SignMeService {
  export type Result = SignMeRepository.Result
}
