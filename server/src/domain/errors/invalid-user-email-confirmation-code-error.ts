export class InvalidUserEmailConfirmationCodeError extends Error {
  constructor() {
    super('invalid user email confirmation code')
    this.name = 'InvalidUserEmailConfirmationCode'
  }
}
