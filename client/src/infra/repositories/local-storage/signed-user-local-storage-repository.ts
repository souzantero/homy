import { User } from "../../../domain/models/user"
import { LoadSignedUserRepository } from "../../../domain/repositories/load-signed-user-repository"
import { UpdateSignedUserRepository } from "../../../domain/repositories/update-signed-user-repository"

export class SignedUserLocalStorageRepository implements UpdateSignedUserRepository, LoadSignedUserRepository {
  private readonly key = 'signed-user'

  async updateSignedUser(user: User): Promise<void> {
    localStorage.setItem(this.key, JSON.stringify(user))
  }

  async loadSignedUser(): Promise<User | null> {
    const rawData = localStorage.getItem(this.key)
    if (!rawData) return null
    const data = JSON.parse(rawData)

    return {
      id: data.id,
      createdAt: new Date(data.createdAt),
      updatedAt: data.updatedAt && new Date(data.updatedAt),
      name: data.name,
      email: data.email,
      authorizationToken: data.authorizationToken
    }
  }
}