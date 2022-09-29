import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
  ValidationPipe
} from '@nestjs/common'
import { RefreshUserEmailConfirmationCode } from '../../domain/usecases/refresh-user-email-confirmation-code'
import { InvalidUserEmailConfirmationCodeError } from '../../domain/errors/invalid-user-email-confirmation-code-error'
import { UserNotFoundError } from '../../domain/errors/user-not-found-error'
import { UserEmailHasAlreadyBeenConfirmedError } from '../../domain/errors/user-email-already-been-confirmed-error'
import { ConfirmUserEmail } from '../../domain/usecases/confirm-user-email'
import { CreateUserPasswordResetToken } from '../../domain/usecases/create-user-password-reset-token'
import { UserEmailHasNotYetBeenConfirmedError } from '../../domain/errors/user-email-has-not-yet-been-confirmed-error'
import { ConfirmEmailInput } from './dtos/confirm-email-input'
import { OutputtedUser } from './dtos/outputted-user'
import { RefreshUserEmailConfirmationCodeInput } from './dtos/refresh-user-email-confirmation-code-input'
import { CreateUserPasswordResetTokenInput } from './dtos/create-user-password-reset-token-input'

@Controller('users')
export class UserController {
  constructor(
    private readonly confirmUserEmail: ConfirmUserEmail,
    private readonly refreshUserEmailConfirmationCode: RefreshUserEmailConfirmationCode,
    private readonly createUserPasswordResetToken: CreateUserPasswordResetToken
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('confirm-email')
  async confirmEmail(
    @Body(ValidationPipe) data: ConfirmEmailInput
  ): Promise<OutputtedUser> {
    try {
      const { email, confirmationCode } = data
      const user = await this.confirmUserEmail.confirm(email, confirmationCode)
      return new OutputtedUser(user)
    } catch (error) {
      if (error instanceof UserNotFoundError)
        throw new NotFoundException(error.message)
      else if (error instanceof InvalidUserEmailConfirmationCodeError)
        throw new BadRequestException(error.message)
      else throw error
    }
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('email-confirmation-code')
  async refreshEmailConfirmationCode(
    @Body(ValidationPipe) data: RefreshUserEmailConfirmationCodeInput
  ): Promise<void> {
    try {
      await this.refreshUserEmailConfirmationCode.refresh(data.email)
    } catch (error) {
      if (error instanceof UserNotFoundError)
        throw new NotFoundException(error.message)
      else if (error instanceof UserEmailHasAlreadyBeenConfirmedError)
        throw new BadRequestException(error.message)
      else throw error
    }
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('password-reset-token')
  async createPasswordResetToken(
    @Body(ValidationPipe) data: CreateUserPasswordResetTokenInput
  ): Promise<void> {
    try {
      await this.createUserPasswordResetToken.create(data.email)
    } catch (error) {
      if (error instanceof UserNotFoundError)
        throw new NotFoundException(error.message)
      else if (error instanceof UserEmailHasNotYetBeenConfirmedError)
        throw new BadRequestException(error.message)
      else throw error
    }
  }
}
