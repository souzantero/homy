import { User } from '../models/user'

export interface AddUserRepository {
  add(user: AddUserRepository.Params): Promise<AddUserRepository.Result>
}

export namespace AddUserRepository {
  export type Params = Omit<
    User,
    'updatedAt' | 'deletedAt' | 'authorizationToken' | 'emailConfirmationCode'
  >
  export type Result = User
}
