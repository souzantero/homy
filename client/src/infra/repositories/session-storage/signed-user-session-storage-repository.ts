import { Role, User } from '../../../domain/models/user'
import { LoadSignedUserRepository } from '../../../domain/repositories/load-signed-user-repository'
import { RemoveSignedUserRepository } from '../../../domain/repositories/remove-signed-user-repository'
import { UpdateSignedUserRepository } from '../../../domain/repositories/update-signed-user-repository'

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
    const role = data.role === 'ADMIN' ? Role.Admin : Role.User

    return {
      id: data.id,
      createdAt: new Date(data.createdAt),
      updatedAt: data.updatedAt && new Date(data.updatedAt),
      name: data.name,
      email: data.email,
      role,
      authorizationToken: data.authorizationToken
    }
  }
}
