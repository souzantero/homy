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
  authorizationToken?: string
}
