import { InvalidUserEmailConfirmationCodeError } from '../errors/invalid-user-email-confirmation-code-error'
import { LoadUserById } from './load-user-by-id'
import { UpdateUserById } from './update-user-by-id'

export class ConfirmUserEmail {
  constructor(
    private readonly loadUserById: LoadUserById,
    private readonly updateUserById: UpdateUserById
  ) {}

  async confirm(userId: string, confirmationCode: string): Promise<void> {
    const user = await this.loadUserById.load(userId)
    if (user.emailConfirmationCode !== confirmationCode) {
      throw new InvalidUserEmailConfirmationCodeError()
    }

    await this.updateUserById.updateById(userId, {
      emailConfirmationCode: null,
      confirmedEmail: true
    })
  }
}
