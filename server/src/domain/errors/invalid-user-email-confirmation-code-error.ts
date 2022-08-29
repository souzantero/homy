export class InvalidUserEmailConfirmationCodeError extends Error {
  constructor() {
    super('invalid user confirmation code')
    this.name = 'InvalidUserEmailConfirmationCode'
  }
}
