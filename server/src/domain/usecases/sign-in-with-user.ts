import { User } from '../models/user'
import { Encrypter } from '../protocols/encrypter'
import { UpdateUserByIdRepository } from '../repositories/update-user-by-id-repository'

export class SignInWithUser {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly updateUserRepository: UpdateUserByIdRepository
  ) { }

  async sign(user: User): Promise<SignInWithUser.Result> {
    const authorizationToken = await this.encrypter.encrypt(user.id)
    await this.updateUserRepository.updateById(user.id, { authorizationToken })
    return { authorizationToken }
  }
}

export namespace SignInWithUser {
  export type Result = {
    authorizationToken: string
  }
}