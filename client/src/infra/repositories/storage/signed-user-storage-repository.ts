import { User } from '../../../domain/models/user'
import { LoadSignedUserRepository } from '../../../domain/repositories/load-signed-user-repository'
import { RemoveSignedUserRepository } from '../../../domain/repositories/remove-signed-user-repository'
import { SignedUserLocalStorageRepository } from '../local-storage/signed-user-local-storage-repository'
import { SignedUserSessionStorageRepository } from '../session-storage/signed-user-session-storage-repository'

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
