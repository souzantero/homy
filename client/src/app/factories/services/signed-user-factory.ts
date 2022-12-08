import { SignedUser } from '../../../domain'
import {
  LocalStorageAdapter,
  SessionStorageAdapter,
  Storage
} from '../../../infra'

export const makeSignedUser = (remind: boolean = false) => {
  const localStorage = new LocalStorageAdapter()
  const sessionStorage = new SessionStorageAdapter()
  const storage = new Storage(localStorage, sessionStorage)
  return new SignedUser(
    storage,
    remind ? localStorage : sessionStorage,
    storage
  )
}
