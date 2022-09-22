import { User } from '../models/user'

export interface ConfirmUserEmailRepository {
  confirmUserEmail(
    params: ConfirmUserEmailRepository.Params
  ): Promise<ConfirmUserEmailRepository.Result>
}

export namespace ConfirmUserEmailRepository {
  export type Params = {
    email: string
    confirmationCode: string
  }

  export type Result = User
}
