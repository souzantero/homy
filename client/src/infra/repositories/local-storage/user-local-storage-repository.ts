import { User } from "../../../domain/models/user";
import { UpdateUserRepository } from "../../../domain/repositories/update-user-repository";
import { UserRepository } from "../../../domain/repositories/user-repository";

export class UserLocalStorageRepository implements UserRepository {
  private getKeyById(id: string) {
    return `User.${id}`
  }

  async updateById(id: string, data: UpdateUserRepository.Data): Promise<User> {
    localStorage.setItem(this.getKeyById(id), JSON.stringify(data))
    return { id, ...data }
  }
}