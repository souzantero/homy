export class UserNotFoundError extends Error {
  constructor() {
    super(`user not found`)
    this.name = 'UserNotFound'
  }
}
