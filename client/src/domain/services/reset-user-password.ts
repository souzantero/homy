import { PasswordsDoesNotMatchError } from '../errors/passwords-does-not-match-error'
import { ResetUserPasswordRepository } from '../repositories/reset-user-password-repository'

export class ResetUserPassword {
  constructor(
    private readonly resetUserPasswordRepository: ResetUserPasswordRepository
  ) {}

  reset({
    newPassword,
    confirmedPassword
  }: ResetUserPassword.Params): Promise<void> {
    if (newPassword !== confirmedPassword) {
      throw new PasswordsDoesNotMatchError()
    }

    return this.resetUserPasswordRepository.resetUserPassword(newPassword)
  }
}

export namespace ResetUserPassword {
  export type Params = {
    newPassword: string
    confirmedPassword: string
  }
}
