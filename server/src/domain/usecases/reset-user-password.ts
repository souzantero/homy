import { User } from '../models/user'
import { Hasher } from '../protocols/hasher'
import { UpdateUserById } from './update-user-by-id'

export class ResetUserPassword {
  constructor(
    private readonly hasher: Hasher,
    private readonly updateUserById: UpdateUserById
  ) {}

  async reset(user: User, password: string): Promise<User> {
    const hashedPassword = await this.hasher.hash(password)
    return this.updateUserById.updateById(user.id, {
      password: hashedPassword,
      authorizationToken: null
    })
  }
}
