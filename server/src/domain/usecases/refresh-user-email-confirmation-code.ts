import { UserEmailHasAlreadyBeenConfirmedError } from '../errors/user-email-already-been-confirmed-error'
import { UserNotFoundError } from '../errors/user-not-found-error'
import { User } from '../models/user'
import { CreateUserEmailConfirmationCode } from './create-user-email-confirmation-code'
import { LoadUser } from './load-user'

export class RefreshUserEmailConfirmationCode {
  constructor(
    private readonly loadUser: LoadUser,
    private readonly createUserEmailConfirmationCode: CreateUserEmailConfirmationCode
  ) {}

  async refresh(email: string): Promise<User> {
    const user = await this.loadUser.loadOne({ email })
    if (!user) throw new UserNotFoundError()
    if (user.confirmedEmail) throw new UserEmailHasAlreadyBeenConfirmedError()

    return this.createUserEmailConfirmationCode.create(user)
  }
}
