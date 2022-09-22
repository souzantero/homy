import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  ValidationPipe
} from '@nestjs/common'
import { RefreshUserEmailConfirmationCode } from '../../domain/usecases/refresh-user-email-confirmation-code'
import { InvalidUserEmailConfirmationCodeError } from '../../domain/errors/invalid-user-email-confirmation-code-error'
import { UserNotFoundError } from '../../domain/errors/user-not-found-error'
import { UserEmailHasAlreadyBeenConfirmedError } from '../../domain/errors/user-email-already-been-confirmed-error'
import { ConfirmUserEmail } from '../../domain/usecases/confirm-user-email'
import { ConfirmEmailInput } from './dtos/confirm-email-input'
import { OutputtedUser } from './dtos/outputted-user'
import { RefreshUserEmailConfirmationCodeInput } from './dtos/refresh-user-email-confirmation-code-input'

@Controller('users')
export class UserController {
  constructor(
    private readonly confirmUserEmail: ConfirmUserEmail,
    private readonly refreshUserEmailConfirmationCode: RefreshUserEmailConfirmationCode
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
  @Patch('refresh-email-confirmation-code')
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
}
