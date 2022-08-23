import { User } from '../models/user'
import { Encrypter } from '../protocols/encrypter'
import { UpdateUserByIdRepository } from '../repositories/update-user-by-id-repository'

export class SignInWithUser {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly updateUserRepository: UpdateUserByIdRepository
  ) {}

  async sign(user: User): Promise<SignInWithUser.Result> {
    const authorizationToken = await this.encrypter.encrypt(user.id)
    const updatedUser = await this.updateUserRepository.updateById(user.id, {
      authorizationToken
    })
    delete updatedUser.deletedAt
    delete updatedUser.password
    return updatedUser
  }
}

export namespace SignInWithUser {
  export type Result = Omit<User, 'deletedAt' | 'password'>
}
