import {
  User,
  RawUser,
  LoadSignedUserRepository,
  RemoveSignedUserRepository,
  UpdateSignedUserRepository
} from '@retaily/client/domain'

export class SignedUserSessionStorageRepository
  implements
    UpdateSignedUserRepository,
    LoadSignedUserRepository,
    RemoveSignedUserRepository
{
  private readonly key = 'signed-user'

  async removeSignedUser(): Promise<void> {
    sessionStorage.removeItem(this.key)
  }

  async updateSignedUser(user: User): Promise<void> {
    sessionStorage.setItem(this.key, JSON.stringify(user))
  }

  async loadSignedUser(): Promise<User | null> {
    const rawData = sessionStorage.getItem(this.key)
    if (!rawData) return null
    const data = JSON.parse(rawData)
    return new RawUser(data)
  }
}
