import { User } from '../models/user'
import { LoadSignedUserRepository } from '../repositories/load-signed-user-repository'

export class LoadSignedUserService {
  constructor(
    private readonly loadSignedUserRepository: LoadSignedUserRepository
  ) {}

  load(): Promise<User | null> {
    return this.loadSignedUserRepository.loadSignedUser()
  }
}
