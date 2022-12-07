import { User } from '../models/user'
import { LoadUserRepository } from '../repositories/load-user-repository'

export class LoadUser {
  constructor(private readonly loadUserRepository: LoadUserRepository) {}

  async loadOne(where: LoadUser.Where): Promise<User> {
    return this.loadUserRepository.loadOne({
      deletedAt: null,
      ...where
    })
  }
}

export namespace LoadUser {
  export type Where = Omit<LoadUserRepository.Where, 'deletedAt'>
}
