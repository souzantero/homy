import { User } from '../models/user'
import { UpdateUserByIdRepository } from '../repositories/update-user-by-id-repository'

export class UpdateUserById {
  constructor(
    private readonly updateUserByIdRepository: UpdateUserByIdRepository
  ) {}

  updateById(id: string, data: UpdateUserById.Data): Promise<User> {
    return this.updateUserByIdRepository.updateById(id, {
      ...data,
      updatedAt: new Date()
    })
  }
}

export namespace UpdateUserById {
  export type Data = Omit<
    UpdateUserByIdRepository.Data,
    'updatedAt' | 'deletedAt'
  >
}
