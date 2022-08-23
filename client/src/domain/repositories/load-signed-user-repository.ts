import { User } from '../models/user'

export interface LoadSignedUserRepository {
  loadSignedUser(): Promise<User | null>
}
