import {
  User,
  LoadSignedUserRepository,
  RemoveSignedUserRepository
} from '@retailer/client/domain'
import { SignedUserLocalStorageRepository } from '../local-storage'
import { SignedUserSessionStorageRepository } from '../session-storage'

export class SignedUserStorageRepository
  implements LoadSignedUserRepository, RemoveSignedUserRepository
{
  constructor(
    private readonly signedUserLocalStorageRepository: SignedUserLocalStorageRepository,
    private readonly signedUserSessionStorageRepository: SignedUserSessionStorageRepository
  ) {}

  async removeSignedUser(): Promise<void> {
    await this.signedUserLocalStorageRepository.removeSignedUser()
    await this.signedUserSessionStorageRepository.removeSignedUser()
  }

  async loadSignedUser(): Promise<User | null> {
    const signedUser =
      await this.signedUserSessionStorageRepository.loadSignedUser()
    if (signedUser) return signedUser
    return this.signedUserLocalStorageRepository.loadSignedUser()
  }
}
