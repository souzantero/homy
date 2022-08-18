import { User } from "../models/user"

export interface UpdateUserRepository {
  updateById(id: string, data: UpdateUserRepository.Data): Promise<User>
}

export namespace UpdateUserRepository {
  export type Data = Omit<User, 'id'>
}