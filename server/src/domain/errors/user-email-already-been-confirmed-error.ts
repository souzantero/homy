export class UserEmailHasAlreadyBeenConfirmedError extends Error {
  constructor() {
    super('user email has already been confirmed')
    this.name = 'UserEmailHasAlreadyBeenConfirmed'
  }
}
