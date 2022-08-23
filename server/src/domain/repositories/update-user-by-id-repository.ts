import { User } from '../models/user'

export interface UpdateUserByIdRepository {
  updateById(
    id: string,
    data: UpdateUserByIdRepository.Data
  ): Promise<UpdateUserByIdRepository.Result>
}

export namespace UpdateUserByIdRepository {
  export type Data = Omit<Partial<User>, 'id' | 'createdAt'>
  export type Result = User
}
