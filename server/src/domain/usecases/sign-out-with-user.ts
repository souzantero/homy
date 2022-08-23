import { User } from '../models/user'
import { UpdateUserByIdRepository } from '../repositories/update-user-by-id-repository'

export class SignOutWithUser {
  constructor(
    private readonly updateUserRepository: UpdateUserByIdRepository
  ) {}

  async signOut(user: User): Promise<void> {
    const { id } = user
    const data = {
      authorizationToken: null,
      updatedAt: new Date()
    }

    await this.updateUserRepository.updateById(id, data)
  }
}
