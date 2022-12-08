import { RawUser, User } from '..'
import { GetStorage } from '../protocols/cache/get-storage'
import { RemoveStorage } from '../protocols/cache/remove-storage'
import { SetStorage } from '../protocols/cache/set-storage'

export class SignedUser {
  private readonly key = 'signed-user'

  constructor(
    private readonly getStorage: GetStorage,
    private readonly setStorage: SetStorage,
    private readonly removeStorage: RemoveStorage
  ) {}

  get(): User | null {
    const rawData = this.getStorage.get(this.key)
    if (!rawData) return null
    return new RawUser(rawData)
  }

  set(user: User): void {
    this.setStorage.set(this.key, user)
  }

  remove(): void {
    this.removeStorage.remove(this.key)
  }
}
