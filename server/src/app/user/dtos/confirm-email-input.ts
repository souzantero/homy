import { Type } from 'class-transformer'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class ConfirmEmailInput {
  @IsEmail()
  @IsNotEmpty()
  @Type(() => String)
  email: string

  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  confirmationCode: string
}
