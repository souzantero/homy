import { ConfirmUserEmailRepository } from '../repositories/confirm-user-email-repository'

export class ConfirmUserEmail {
  constructor(
    private readonly confirmUserEmailRepository: ConfirmUserEmailRepository
  ) {}

  confirm(params: ConfirmUserEmail.Params): Promise<ConfirmUserEmail.Result> {
    return this.confirmUserEmailRepository.confirmUserEmail(params)
  }
}

export namespace ConfirmUserEmail {
  export type Params = ConfirmUserEmailRepository.Params
  export type Result = ConfirmUserEmailRepository.Result
}
