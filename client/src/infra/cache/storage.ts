import { GetStorage } from '../../domain/protocols/cache/get-storage'
import { RemoveStorage } from '../../domain/protocols/cache/remove-storage'
import { LocalStorageAdapter } from './local-storage-adapter'
import { SessionStorageAdapter } from './session-storage-adapter'

export class Storage implements GetStorage, RemoveStorage {
  constructor(
    private readonly localStorage: LocalStorageAdapter,
    private readonly sessionStorage: SessionStorageAdapter
  ) {}

  get(key: string) {
    const data = this.sessionStorage.get(key)
    if (data) return data
    return this.localStorage.get(key)
  }

  remove(key: string): void {
    this.localStorage.remove(key)
    this.sessionStorage.remove(key)
  }
}
