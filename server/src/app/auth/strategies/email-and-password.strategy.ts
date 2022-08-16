import { Injectable, UnauthorizedException } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { Strategy } from "passport-local"
import { User } from "../../../domain/models/user"
import { AuthenticateUserByEmailAndPassword } from "../../../domain/usecases/authenticate-user-by-email-and-password"

@Injectable()
export class EmailAndPasswordStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authenticateUser: AuthenticateUserByEmailAndPassword
  ) {
    super({
      usernameField: 'email',
      passwordField: 'password'
    })
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.authenticateUser.authenticate({ email, password })
    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}