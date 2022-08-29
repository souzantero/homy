import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  ValidationPipe
} from '@nestjs/common'
import { ConfirmUserEmail } from '../../domain/usecases/confirm-user-email'
import { ConfirmEmailInput } from './dtos/confirm-email-input'

@Controller('users')
export class UserController {
  constructor(private readonly confirmUserEmail: ConfirmUserEmail) {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post(':userId/confirm-email')
  confirmEmail(
    @Param('userId') userId: string,
    @Body(ValidationPipe) data: ConfirmEmailInput
  ) {
    return this.confirmUserEmail.confirm(userId, data.confirmationCode)
  }
}
