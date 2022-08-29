import { UserNotFoundError } from '../errors/user-not-found-error'
import { User } from '../models/user'
import { LoadUser } from './load-user'

export class LoadUserById {
  constructor(private readonly loadUser: LoadUser) {}

  async load(id: string): Promise<User> {
    const user = await this.loadUser.loadOne({ id })
    if (!user) throw new UserNotFoundError()
    return user
  }
}
