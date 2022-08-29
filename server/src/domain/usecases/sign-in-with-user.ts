import { User } from '../models/user'
import { Encrypter } from '../protocols/encrypter'
import { UpdateUserById } from './update-user-by-id'

export class SignInWithUser {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly updateUser: UpdateUserById
  ) {}

  async sign(user: User): Promise<SignInWithUser.Result> {
    const authorizationToken = await this.encrypter.encrypt(user.id)
    return this.updateUser.updateById(user.id, { authorizationToken })
  }
}

export namespace SignInWithUser {
  export type Result = User
}
