import { RemoveSignedUserRepository } from "../repositories/remove-signed-user-repository"

export class SignOutService {
  constructor(
    private readonly removeSignedUserRepository: RemoveSignedUserRepository
  ) { }

  signOut(): Promise<void> {
    return this.removeSignedUserRepository.removeSignedUser()
  }
}