export class PasswordsDoesNotMatchError extends Error {
  constructor() {
    super('passwords does not match')
    this.name = 'PasswordsDoesNotMatch'
  }
}
