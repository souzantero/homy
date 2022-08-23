export type User = {
  id: string
  createdAt: Date
  updatedAt?: Date
  name: string
  email: string
  authorizationToken?: string
}
