import { UserNotFoundError } from '../errors/user-not-found-error'
import { User } from '../models/user'
import { LoadUserRepository } from '../repositories/load-user-repository'

export class LoadUserById {
  constructor(private readonly loadUserRepository: LoadUserRepository) {}

  async load(id: string): Promise<User> {
    const user = await this.loadUserRepository.loadOne({ id, deletedAt: null })
    if (!user) throw new UserNotFoundError(id)
    return user
  }
}
