import { EmailInUseError } from '../errors/email-in-use-error'
import { Role, User } from '../models/user'
import { Hasher } from '../protocols/hasher'
import { Identifier } from '../protocols/identifier'
import { AddUserRepository } from '../repositories/add-user-repository'
import { LoadUserRepository } from '../repositories/load-user-repository'

export class AddUser {
  constructor(
    private readonly identifier: Identifier,
    private readonly hasher: Hasher,
    private readonly loadUserRepository: LoadUserRepository,
    private readonly addUserRepository: AddUserRepository
  ) {}

  async add(data: AddUser.Params): Promise<AddUser.Result> {
    const user = await this.loadUserRepository.loadOne({
      email: data.email,
      deletedAt: null
    })
    if (user) {
      throw new EmailInUseError()
    }

    const id = this.identifier.identify()
    const createdAt = new Date()
    const hashedPassword = await this.hasher.hash(data.password)
    const addedUser = await this.addUserRepository.add({
      ...data,
      role: data.role ? data.role : Role.USER,
      password: hashedPassword,
      id,
      createdAt
    })

    return addedUser
  }
}

export namespace AddUser {
  export type Params = {
    name: string
    email: string
    password: string
    role?: Role
  }

  export type Result = User
}
