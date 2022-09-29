import { UserNotFoundError } from '../errors/user-not-found-error'
import { User } from '../models/user'
import { Hasher } from '../protocols/hasher'
import { LoadUser } from './load-user'
import { UpdateUserById } from './update-user-by-id'

export class ResetUserPassword {
  constructor(
    private readonly hasher: Hasher,
    private readonly loadUser: LoadUser,
    private readonly updateUserById: UpdateUserById
  ) {}

  async reset({
    email,
    password
  }: ResetUserPassword.Params): Promise<ResetUserPassword.Result> {
    const user = await this.loadUser.loadOne({ email })
    if (!user) throw new UserNotFoundError()
    const hashedPassword = await this.hasher.hash(password)
    return this.updateUserById.updateById(user.id, { password: hashedPassword })
  }
}

export namespace ResetUserPassword {
  export type Params = {
    email: string
    password: string
  }

  export type Result = User
}
