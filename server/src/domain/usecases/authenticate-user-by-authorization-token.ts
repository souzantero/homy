import { User } from '../models/user'
import { Decrypter } from '../protocols/decrypter'
import { LoadUserById } from './load-user-by-id'

export class AuthenticateUserByAuthorizationToken {
  constructor(
    private readonly decrypter: Decrypter,
    private readonly loadUserById: LoadUserById
  ) {}

  async authenticate(
    authorizationToken: string
  ): Promise<AuthenticateUserByAuthorizationToken.Result> {
    try {
      const decrypted = await this.decrypter.decrypt(authorizationToken)
      if (!decrypted) return null
      const user = await this.loadUserById.load(decrypted.sub)
      if (!user) return null
      if (user.authorizationToken !== authorizationToken) return null
      return user
    } catch {
      return null
    }
  }
}

export namespace AuthenticateUserByAuthorizationToken {
  export type Result = User
}
