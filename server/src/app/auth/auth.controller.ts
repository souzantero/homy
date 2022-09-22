import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  ValidationPipe
} from '@nestjs/common'
import { EmailInUseError } from '../../domain/errors/email-in-use-error'
import { User } from '../../domain/models/user'
import { AddUser } from '../../domain/usecases/add-user'
import { SignInWithUser } from '../../domain/usecases/sign-in-with-user'
import { SignOutWithUser } from '../../domain/usecases/sign-out-with-user'
import { AuthenticatedUser } from './decorators/authenticated-user.decorator'
import { AuthorizationTokenGuard, EmailAndPasswordGuard } from './auth.guards'
import { SignUpInput } from './dtos/sign-up-input'
import { SignedUser } from './dtos/signed-user'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly addUser: AddUser,
    private readonly signInWithUser: SignInWithUser,
    private readonly signOutWithUser: SignOutWithUser
  ) {}

  @Post('sign-up')
  async signUp(@Body(ValidationPipe) data: SignUpInput): Promise<SignedUser> {
    try {
      const addedUser = await this.addUser.add(data)
      const signedUser = await this.signInWithUser.sign(addedUser)
      return new SignedUser(signedUser)
    } catch (error) {
      if (error instanceof EmailInUseError)
        throw new ForbiddenException(error.message)
      else throw error
    }
  }

  @UseGuards(EmailAndPasswordGuard)
  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(@AuthenticatedUser() user: User): Promise<SignedUser> {
    const signedUser = await this.signInWithUser.sign(user)
    return new SignedUser(signedUser)
  }

  @UseGuards(AuthorizationTokenGuard)
  @Post('sign-out')
  @HttpCode(HttpStatus.RESET_CONTENT)
  async signOut(@AuthenticatedUser() user: User) {
    return this.signOutWithUser.signOut(user)
  }

  @UseGuards(AuthorizationTokenGuard)
  @Get('me')
  async me(@AuthenticatedUser() user: User): Promise<SignedUser> {
    return new SignedUser(user)
  }
}
