import { ForgetUserPasswordRepository } from '../repositories'

export class ForgetUserPassword {
  constructor(
    private readonly forgetUserPasswordRepository: ForgetUserPasswordRepository
  ) {}

  forget(params: ForgetUserPassword.Params): Promise<void> {
    return this.forgetUserPasswordRepository.forgetUserPassword(params.email)
  }
}

export namespace ForgetUserPassword {
  export type Params = {
    email: string
  }
}
