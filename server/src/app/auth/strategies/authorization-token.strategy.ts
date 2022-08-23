import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-http-bearer'
import { AuthenticateUserByAuthorizationToken } from '../../../domain/usecases/authenticate-user-by-authorization-token'
import { User } from '../../../domain/models/user'

@Injectable()
export class AuthorizationTokenStrategy extends PassportStrategy(
  Strategy,
  'authorization-token'
) {
  constructor(
    private readonly authenticateUser: AuthenticateUserByAuthorizationToken
  ) {
    super()
  }

  async validate(authorizationToken: string): Promise<User> {
    const user = await this.authenticateUser.authenticate(authorizationToken)
    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}
