export enum Role {
  User = 'USER',
  Admin = 'ADMIN'
}

export type User = {
  id: string
  createdAt: Date
  updatedAt?: Date
  name: string
  email: string
  role: Role
  confirmedEmail: boolean
  authorizationToken?: string
}

export class RawUser implements User {
  id: string
  createdAt: Date
  updatedAt?: Date | undefined
  name: string
  email: string
  role: Role
  confirmedEmail: boolean
  authorizationToken?: string | undefined

  constructor(user: any) {
    this.id = user.id
    this.createdAt = new Date(user.createdAt)
    this.updatedAt = user.updatedAt && new Date(user.createdAt)
    this.name = user.name
    this.email = user.email
    this.role = user.role === 'ADMIN' ? Role.Admin : Role.User
    this.confirmedEmail = user.confirmedEmail
    this.authorizationToken = user.authorizationToken
  }
}
