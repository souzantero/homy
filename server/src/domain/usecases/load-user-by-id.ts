import { User } from "../models/user";
import { LoadUserRepository } from "../repositories/load-user-repository";

export class LoadUserById {
  constructor(
    private readonly loadUserRepository: LoadUserRepository
  ) { }

  load(id: string): Promise<User> {
    return this.loadUserRepository.loadOne({ id, deletedAt: null })
  }
}