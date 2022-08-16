import { Controller, Post, UseGuards } from '@nestjs/common'
import { User } from '../../domain/models/user'
import { SignInWithUser } from '../../domain/usecases/sign-in-with-user'
import { AuthenticatedUser } from './decorators/authenticated-user.decorator'
import { EmailAndPasswordGuard } from './auth.guards'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly signInWithUser: SignInWithUser
  ) { }

  @UseGuards(EmailAndPasswordGuard)
  @Post('sign-in')
  async signIn(@AuthenticatedUser() user: User) {
    return this.signInWithUser.sign(user)
  }
}
