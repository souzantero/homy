export interface ConfirmUserEmailRepository {
  confirmUserEmail(params: ConfirmUserEmailRepository.Params): Promise<void>
}

export namespace ConfirmUserEmailRepository {
  export type Params = {
    email: string
    confirmationCode: string
  }
}
