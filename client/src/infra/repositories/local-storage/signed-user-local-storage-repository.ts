import {
  LoadSignedUserRepository,
  UpdateSignedUserRepository,
  User,
  RawUser,
  RemoveSignedUserRepository
} from '@retailer/client/domain'

export class SignedUserLocalStorageRepository
  implements
    UpdateSignedUserRepository,
    LoadSignedUserRepository,
    RemoveSignedUserRepository
{
  private readonly key = 'signed-user'

  async removeSignedUser(): Promise<void> {
    localStorage.removeItem(this.key)
  }

  async updateSignedUser(user: User): Promise<void> {
    localStorage.setItem(this.key, JSON.stringify(user))
  }

  async loadSignedUser(): Promise<User | null> {
    const rawData = localStorage.getItem(this.key)
    if (!rawData) return null
    const data = JSON.parse(rawData)
    return new RawUser(data)
  }
}
