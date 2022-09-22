import { InvalidUserEmailConfirmationCodeError } from '../errors/invalid-user-email-confirmation-code-error'
import { UserNotFoundError } from '../errors/user-not-found-error'
import { User } from '../models/user'
import { LoadUser } from './load-user'
import { UpdateUserById } from './update-user-by-id'

export class ConfirmUserEmail {
  constructor(
    private readonly loadUser: LoadUser,
    private readonly updateUserById: UpdateUserById
  ) {}

  async confirm(email: string, confirmationCode: string): Promise<User> {
    const user = await this.loadUser.loadOne({ email })
    if (!user) throw new UserNotFoundError()

    if (user.emailConfirmationCode !== confirmationCode) {
      throw new InvalidUserEmailConfirmationCodeError()
    }

    return this.updateUserById.updateById(user.id, {
      emailConfirmationCode: null,
      confirmedEmail: true
    })
  }
}
