import { User } from '../models/user'
import { UpdateUserById } from './update-user-by-id'

export class CreateUserEmailConfirmationCode {
  constructor(private readonly updateUserById: UpdateUserById) {}

  async create({ id }: User): Promise<User> {
    const emailConfirmationCode = `${this.getRandomInt(100000, 600000)}`
    return this.updateUserById.updateById(id, { emailConfirmationCode })
  }

  private getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
}
