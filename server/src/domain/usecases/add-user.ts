import { EmailInUseError } from '../errors/email-in-use-error'
import { User } from '../models/user'
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
      password: hashedPassword,
      id,
      createdAt
    })
    delete addedUser.password
    return addedUser
  }
}

export namespace AddUser {
  export type Params = {
    name: string
    email: string
    password: string
  }

  export type Result = Omit<User, 'password'>
}
