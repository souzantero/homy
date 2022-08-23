import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  UseGuards,
  ValidationPipe
} from '@nestjs/common'
import { EmailInUseError } from '../../domain/errors/email-in-use-error'
import { User } from '../../domain/models/user'
import { AddUser } from '../../domain/usecases/add-user'
import { SignInWithUser } from '../../domain/usecases/sign-in-with-user'
import { AuthenticatedUser } from './decorators/authenticated-user.decorator'
import { AuthorizationTokenGuard, EmailAndPasswordGuard } from './auth.guards'
import { SignUpInput } from './dtos/sign-up-input'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly addUser: AddUser,
    private readonly signInWithUser: SignInWithUser
  ) {}

  @Post('sign-up')
  async signUp(@Body(ValidationPipe) data: SignUpInput) {
    try {
      const addedUser = await this.addUser.add(data)
      return this.signInWithUser.sign(addedUser)
    } catch (error) {
      if (error instanceof EmailInUseError)
        throw new ForbiddenException(error.message)
      else throw error
    }
  }

  @UseGuards(EmailAndPasswordGuard)
  @Post('sign-in')
  async signIn(@AuthenticatedUser() user: User) {
    return this.signInWithUser.sign(user)
  }

  @UseGuards(AuthorizationTokenGuard)
  @Get('me')
  async me(@AuthenticatedUser() user: User) {
    delete user.deletedAt
    delete user.password
    delete user.authorizationToken
    return user
  }
}
