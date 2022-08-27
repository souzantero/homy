export enum Role {
  User = 'USER',
  Admin = 'ADMIN'
}

export type User = {
  id: string
  createdAt: Date
  updatedAt?: Date
  deletedAt?: Date
  name: string
  email: string
  password: string
  role: Role
  authorizationToken?: string
}
