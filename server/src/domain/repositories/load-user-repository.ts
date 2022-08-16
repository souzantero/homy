import { User } from "../models/user"

export interface LoadUserRepository {
  loadOne(where: LoadUserRepository.Where): Promise<LoadUserRepository.Result>
}

export namespace LoadUserRepository {
  export type Where = Omit<Partial<User>, 'password'>
  export type Result = User | null
}