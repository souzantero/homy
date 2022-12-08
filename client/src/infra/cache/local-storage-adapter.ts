import { GetStorage } from '../../domain/protocols/cache/get-storage'
import { RemoveStorage } from '../../domain/protocols/cache/remove-storage'
import { SetStorage } from '../../domain/protocols/cache/set-storage'

export class LocalStorageAdapter
  implements GetStorage, SetStorage, RemoveStorage
{
  get(key: string): any {
    const rawData = localStorage.getItem(key)
    if (!rawData) return null
    return JSON.parse(rawData)
  }

  set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value))
  }

  remove(key: string): void {
    localStorage.removeItem(key)
  }
}
