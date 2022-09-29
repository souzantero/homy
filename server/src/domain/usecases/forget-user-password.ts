import { UserEmailHasNotYetBeenConfirmedError } from '../errors/user-email-has-not-yet-been-confirmed-error'
import { UserNotFoundError } from '../errors/user-not-found-error'
import { User } from '../models/user'
import { Encrypter } from '../protocols/encrypter'
import { LoadUser } from './load-user'
import { UpdateUserById } from './update-user-by-id'

export class ForgetUserPassword {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly loadUser: LoadUser,
    private readonly updateUserById: UpdateUserById
  ) {}

  async forget(email: string): Promise<User> {
    const user = await this.loadUser.loadOne({ email })
    if (!user) throw new UserNotFoundError()
    if (!user.confirmedEmail) throw new UserEmailHasNotYetBeenConfirmedError()
    const authorizationToken = await this.encrypter.encrypt(user.id)
    return this.updateUserById.updateById(user.id, { authorizationToken })
  }
}
