export class UserNotFoundError extends Error {
  constructor(userId: string) {
    super(`user id ${userId} not found`)
    this.name = 'UserNotFound'
  }
}
