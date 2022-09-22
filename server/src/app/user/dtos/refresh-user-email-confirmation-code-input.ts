import { Type } from 'class-transformer'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class RefreshUserEmailConfirmationCodeInput {
  @IsEmail()
  @IsNotEmpty()
  @Type(() => String)
  email: string
}
