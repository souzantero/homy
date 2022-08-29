import { EmailInUseError } from '../errors/email-in-use-error'
import { UserNotFoundError } from '../errors/user-not-found-error'
import { Role, User } from '../models/user'
import { Hasher } from '../protocols/hasher'
import { Identifier } from '../protocols/identifier'
import { AddUserRepository } from '../repositories/add-user-repository'
import { LoadUser } from './load-user'

export class AddUser {
  public readonly onAdded: AddUser.AddedEvent[] = []

  constructor(
    private readonly identifier: Identifier,
    private readonly hasher: Hasher,
    private readonly loadUser: LoadUser,
    private readonly addUserRepository: AddUserRepository
  ) {}

  async add(data: AddUser.Params): Promise<AddUser.Result> {
    const user = await this.loadUser.loadOne({ email: data.email })

    if (user) {
      throw new EmailInUseError()
    }

    const id = this.identifier.identify()
    const createdAt = new Date()
    const hashedPassword = await this.hasher.hash(data.password)
    const addedUser = await this.addUserRepository.add({
      ...data,
      id,
      createdAt,
      password: hashedPassword,
      role: Role.User,
      confirmedEmail: false
    })

    for (const event of this.onAdded) {
      await event.onAdded(addedUser)
    }

    return addedUser
  }
}

export namespace AddUser {
  export type Params = {
    name: string
    email: string
    password: string
  }

  export type Result = User

  export interface AddedEvent {
    onAdded(user: User): Promise<void>
  }
}
