import { RemoveSignedUserRepository } from '../repositories/remove-signed-user-repository'
import { SignOutRepository } from '../repositories/sign-out-repository'

export class SignOut {
  constructor(
    private readonly signOutRepository: SignOutRepository,
    private readonly removeSignedUserRepository: RemoveSignedUserRepository
  ) {}

  async signOut(): Promise<void> {
    try {
      await this.signOutRepository.signOut()
    } catch {}
    return this.removeSignedUserRepository.removeSignedUser()
  }
}
