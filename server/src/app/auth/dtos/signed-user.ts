import { User } from 'src/domain/models/user'
import { OutputtedUser } from '../../user/dtos/outputted-user'

export class SignedUser extends OutputtedUser {
  authorizationToken: string

  constructor(user: User) {
    super(user)
    this.authorizationToken = user.authorizationToken
  }
}
