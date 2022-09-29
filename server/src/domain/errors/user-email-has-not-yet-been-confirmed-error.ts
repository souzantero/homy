export class UserEmailHasNotYetBeenConfirmedError extends Error {
  constructor() {
    super("the user's email has not yet been confirmed")
    this.name = 'UserEmailHasNotYetBeenConfirmed'
  }
}
