import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
  UseGuards,
  ValidationPipe
} from '@nestjs/common'
import { RefreshUserEmailConfirmationCode } from '../../domain/usecases/refresh-user-email-confirmation-code'
import { InvalidUserEmailConfirmationCodeError } from '../../domain/errors/invalid-user-email-confirmation-code-error'
import { UserNotFoundError } from '../../domain/errors/user-not-found-error'
import { UserEmailHasAlreadyBeenConfirmedError } from '../../domain/errors/user-email-already-been-confirmed-error'
import { ConfirmUserEmail } from '../../domain/usecases/confirm-user-email'
import { ForgetUserPassword } from '../../domain/usecases/forget-user-password'
import { ResetUserPassword } from '../../domain/usecases/reset-user-password'
import { UserEmailHasNotYetBeenConfirmedError } from '../../domain/errors/user-email-has-not-yet-been-confirmed-error'
import { ConfirmEmailInput } from './dtos/confirm-email-input'
import { OutputtedUser } from './dtos/outputted-user'
import { RefreshUserEmailConfirmationCodeInput } from './dtos/refresh-user-email-confirmation-code-input'
import { ForgetPasswordInput } from './dtos/forget-password-input'
import { ResetPasswordInput } from './dtos/reset-password-input'
import { AuthorizationTokenGuard } from '../auth/auth.guards'

@Controller('users')
export class UserController {
  constructor(
    private readonly confirmUserEmail: ConfirmUserEmail,
    private readonly refreshUserEmailConfirmationCode: RefreshUserEmailConfirmationCode,
    private readonly forgetUserPassword: ForgetUserPassword,
    private readonly resetUserPassword: ResetUserPassword
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
  @Post('forget-password')
  async forgetPassword(
    @Body(ValidationPipe) data: ForgetPasswordInput
  ): Promise<void> {
    try {
      await this.forgetUserPassword.forget(data.email)
    } catch (error) {
      if (error instanceof UserNotFoundError)
        throw new NotFoundException(error.message)
      else if (error instanceof UserEmailHasNotYetBeenConfirmedError)
        throw new BadRequestException(error.message)
      else throw error
    }
  }

  @UseGuards(AuthorizationTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Post('reset-password')
  async resetPassword(
    @Body() data: ResetPasswordInput
  ): Promise<OutputtedUser> {
    try {
      const user = await this.resetUserPassword.reset(data)
      return new OutputtedUser(user)
    } catch (error) {
      if (error instanceof UserNotFoundError)
        throw new NotFoundException(error.message)
      else throw error
    }
  }
}
