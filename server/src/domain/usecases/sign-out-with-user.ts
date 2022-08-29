import { User } from '../models/user'
import { UpdateUserById } from './update-user-by-id'

export class SignOutWithUser {
  constructor(private readonly updateUser: UpdateUserById) {}

  async signOut(user: User): Promise<void> {
    const { id } = user
    const data = { authorizationToken: null }
    await this.updateUser.updateById(id, data)
  }
}
