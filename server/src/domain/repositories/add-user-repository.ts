import { Role, User } from '../models/user'

export interface AddUserRepository {
  add(user: AddUserRepository.Params): Promise<AddUserRepository.Result>
}

export namespace AddUserRepository {
  export type Params = {
    id: string
    createdAt: Date
    name: string
    email: string
    password: string
    role: Role
  }

  export type Result = User
}
