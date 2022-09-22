import { Role, User } from '../../../domain/models/user'

export class OutputtedUser implements OutputtedUser.Properties {
  id: string
  createdAt: Date
  updatedAt?: Date
  name: string
  email: string
  role: Role
  confirmedEmail: boolean

  constructor(user: User) {
    this.id = user.id
    this.createdAt = user.createdAt
    this.updatedAt = user.updatedAt
    this.name = user.name
    this.email = user.email
    this.role = user.role
    this.confirmedEmail = user.confirmedEmail
  }
}

export namespace OutputtedUser {
  export type Properties = Pick<
    User,
    | 'id'
    | 'createdAt'
    | 'updatedAt'
    | 'name'
    | 'email'
    | 'role'
    | 'confirmedEmail'
  >
}
