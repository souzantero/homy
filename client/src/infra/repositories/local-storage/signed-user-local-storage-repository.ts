import { User } from "../../../domain/models/user";
import { UpdateSignedUserRepository } from "../../../domain/repositories/update-signed-user-repository";

export class SignedUserLocalStorageRepository implements UpdateSignedUserRepository {
  private readonly key = 'signed-user'

  async updateSignedUser(user: User): Promise<void> {
    localStorage.setItem(this.key, JSON.stringify(user))
  }
}