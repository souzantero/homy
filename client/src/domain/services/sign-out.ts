import { SignOutRepository } from '../repositories/sign-out-repository'
import { SignedUser } from './signed-user'

export class SignOut {
  constructor(
    private readonly signOutRepository: SignOutRepository,
    private readonly signedUser: SignedUser
  ) {}

  async signOut(): Promise<void> {
    try {
      await this.signOutRepository.signOut()
    } catch {}
    return this.signedUser.remove()
  }
}
