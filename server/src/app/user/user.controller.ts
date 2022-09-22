import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  ValidationPipe
} from '@nestjs/common'
import { InvalidUserEmailConfirmationCodeError } from '../../domain/errors/invalid-user-email-confirmation-code-error'
import { UserNotFoundError } from '../../domain/errors/user-not-found-error'
import { ConfirmUserEmail } from '../../domain/usecases/confirm-user-email'
import { ConfirmEmailInput } from './dtos/confirm-email-input'

@Controller('users')
export class UserController {
  constructor(private readonly confirmUserEmail: ConfirmUserEmail) {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('confirm-email')
  async confirmEmail(@Body(ValidationPipe) data: ConfirmEmailInput) {
    try {
      const { email, confirmationCode } = data
      return await this.confirmUserEmail.confirm(email, confirmationCode)
    } catch (error) {
      if (error instanceof UserNotFoundError)
        throw new NotFoundException('user not found')
      else if (error instanceof InvalidUserEmailConfirmationCodeError)
        throw new BadRequestException(error.message)
      else throw error
    }
  }
}
