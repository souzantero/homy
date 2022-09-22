import { InvalidUserEmailConfirmationCodeError } from '../errors/invalid-user-email-confirmation-code-error'
import { UserNotFoundError } from '../errors/user-not-found-error'
import { LoadUser } from './load-user'
import { UpdateUserById } from './update-user-by-id'

export class ConfirmUserEmail {
  constructor(
    private readonly loadUser: LoadUser,
    private readonly updateUserById: UpdateUserById
  ) {}

  async confirm(email: string, confirmationCode: string): Promise<void> {
    const user = await this.loadUser.loadOne({ email })
    if (!user) throw new UserNotFoundError()

    if (user.emailConfirmationCode !== confirmationCode) {
      throw new InvalidUserEmailConfirmationCodeError()
    }

    await this.updateUserById.updateById(user.id, {
      emailConfirmationCode: null,
      confirmedEmail: true
    })
  }
}
