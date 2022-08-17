export type User = {
  id: string
  createdAt: Date
  updatedAt?: Date
  deletedAt?: Date
  name: string
  email: string
  password: string
  authorizationToken?: string
}