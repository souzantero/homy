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
import { OutputtedUser } from './dtos/outputted-user'

@Controller('users')
export class UserController {
  constructor(private readonly confirmUserEmail: ConfirmUserEmail) {}

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
        throw new NotFoundException('user not found')
      else if (error instanceof InvalidUserEmailConfirmationCodeError)
        throw new BadRequestException(error.message)
      else throw error
    }
  }
}
