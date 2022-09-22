import { ConfirmUserEmailRepository } from '../repositories/confirm-user-email-repository'

export class ConfirmUserEmailService {
  constructor(
    private readonly confirmUserEmailRepository: ConfirmUserEmailRepository
  ) {}

  confirm(params: ConfirmUserEmailService.Params): Promise<void> {
    return this.confirmUserEmailRepository.confirmUserEmail(params)
  }
}

export namespace ConfirmUserEmailService {
  export type Params = ConfirmUserEmailRepository.Params
}
